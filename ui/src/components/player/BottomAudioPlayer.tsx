import React, {useEffect, useRef} from "react";
import {Box, Group, Text} from "@mantine/core";
import {Trans, useTranslation} from "react-i18next";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useToasts} from "../../hooks/useToasts.tsx";
import {ToastType} from "../../context/ToastContext.tsx";
import useCurrentBreakpoint from "../../hooks/useCurrentBreakPoint.tsx";
import LargeScreenAudioPlayer from "./LargeScreenAudioPlayer.tsx";
import SmallScreenAudioPlayer from "./SmallScreenAudioPlayer.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";
import {useActiveVariant} from "../../hooks/useActiveVariant.tsx";

const BottomAudioPlayer: React.FC = () => {

    const playbackErrorRef = useRef<string | null>(null);

    const {t} = useTranslation();
    const {notify} = useToasts();
    const breakpoint = useCurrentBreakpoint();
    const {
        track,
        isPlaying,
        playerRef,
        setIsPlaying,
        setCurrentTime,
    } = useAudioPlayer();

    const {index} = useActiveVariant();

    const audios = track?.audio?.split(";") || [];
    const audio = audios[index] || audios[0];

    const src = track
        ? `${import.meta.env.VITE_API_URL}/tunes/${track.id}/audio?variant=${index}`
        : "";

    const updateCurrentTime = (event: Event) => {
        const element = event.target as HTMLAudioElement;
        setCurrentTime(element.currentTime);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);

        const element = playerRef.current?.audio?.current;

        if (element) {
            element.currentTime = 0;
        }
    };

    const handlePlaybackError = () => {
        const element = playerRef.current?.audio?.current;

        if (!element) {
            return;
        }

        const error = element.error;

        console.log("Audio error", {
            code: error?.code,
            message: error?.message,
            currentTime: element.currentTime,
            duration: element.duration,
        });

        const nearEnd =
            Number.isFinite(element.duration) &&
            element.duration > 0 &&
            (
                element.duration - element.currentTime < 2 ||
                element.currentTime / element.duration > 0.98
            );

        if (
            error?.code === MediaError.MEDIA_ERR_DECODE &&
            nearEnd
        ) {
            setIsPlaying(false);
            setCurrentTime(0);

            // Chrome/Symphonia can report a decode error for a malformed
            // final MP3 frame. Reload to clear the fatal media error state.
            element.load();

            return;
        }

        if (playbackErrorRef.current === src) {
            return;
        }

        playbackErrorRef.current = src;

        notify(t("toast.error.playbackError", {file: audio || ""}), ToastType.ERROR);

        setIsPlaying(false);
    };

    useEffect(() => {
        playbackErrorRef.current = null;
        setCurrentTime(0);
    }, [src, setCurrentTime]);

    useEffect(() => {
        if (!track) {
            return;
        }

        const timeout = window.setTimeout(() => {
            const element = playerRef.current?.audio?.current;

            if (!element) {
                return;
            }

            if (isPlaying) {
                if (
                    element.ended ||
                    (
                        Number.isFinite(element.duration) &&
                        element.currentTime >= element.duration
                    )
                ) {
                    element.currentTime = 0;
                    setCurrentTime(0);
                }

                element.play().catch(() => {
                    setIsPlaying(false);
                });
            } else {
                element.pause();
            }
        }, 0);

        return () => window.clearTimeout(timeout);
    }, [
        track,
        src,
        isPlaying,
        playerRef,
        setIsPlaying,
        setCurrentTime,
    ]);

    if (!track) {
        return (
            <Box py={4} px="xs"/>
        );
    }

    const playerProps = {
        playerRef,
        track,
        src,
        onListen: updateCurrentTime,
        onPlaying: () => setIsPlaying(true),
        onPause: () => setIsPlaying(false),
        onError: handlePlaybackError,
        onEnded: handleEnded,
    };

    return (
        <Box py={4} px="xs">
            {track.canListen
                ? ["xxs", "xs"].includes(breakpoint)
                    ? <SmallScreenAudioPlayer {...playerProps}/>
                    : <LargeScreenAudioPlayer {...playerProps}/>
                : (
                    <Group justify="space-between">
                        <Group>
                            <Trans
                                i18nKey="player.insufficientPrivileges"
                                values={{ref: track.ref}}
                                components={{
                                    b: <Text fw="bold"/>,
                                }}
                            />
                        </Group>
                        <PlayerCloseButton/>
                    </Group>
                )
            }
        </Box>
    );
};

export default BottomAudioPlayer;