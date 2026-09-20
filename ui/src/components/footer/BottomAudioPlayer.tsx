import React, {useEffect, useRef} from 'react';
import {Box, Group, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Trans, useTranslation} from "react-i18next";
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
    const {track, isPlaying, playerRef, setIsPlaying, loopStage, setCurrentTime} = useAudioPlayer();
    const {index} = useActiveVariant();

    const audios = track?.audio?.split(";") || [];
    const audio = audios[index] || audios[0];

    const src = track
        ? `${import.meta.env.VITE_API_URL}/tunes/${track.id}/audio?variant=${index}`
        : "";

    const updateCurrentTime = (event: React.SyntheticEvent<HTMLAudioElement>) => {
        setCurrentTime(event.currentTarget.currentTime);
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

            // Important: clears MEDIA_ERR_DECODE state
            element.load();

            return;
        }

        if (playbackErrorRef.current === src) {
            return;
        }

        playbackErrorRef.current = src;

        notify(
            t("toast.error.playbackError", {
                file: audio || ""
            }),
            ToastType.ERROR
        );

        setIsPlaying(false);
    };

    useEffect(() => {
        playbackErrorRef.current = null;
        setCurrentTime(0);
    }, [src, setCurrentTime]);

    useEffect(() => {
        if (!track) return;

        const timeout = window.setTimeout(() => {
            const audio = playerRef.current?.audio?.current;
            if (!audio) return;

            if (isPlaying) {
                if (
                    audio.ended ||
                    (
                        Number.isFinite(audio.duration) &&
                        audio.currentTime >= audio.duration
                    )
                ) {
                    audio.currentTime = 0;
                    setCurrentTime(0);
                }

                audio.play().catch(() => {
                    setIsPlaying(false);
                });
            } else {
                audio.pause();
            }
        }, 0);

        return () => window.clearTimeout(timeout);
    }, [track, src, isPlaying, playerRef, setIsPlaying, setCurrentTime]);

    return (

        <Box py={4} px={"xs"}>
            {track && <>
                {track.canListen
                    ? <>
                        {["xxs", "xs"].includes(breakpoint) ?
                            <SmallScreenAudioPlayer
                                playerRef={playerRef}
                                loopStage={loopStage}
                                track={track}
                                src={src}
                                onListen={updateCurrentTime}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                                onEnded={handleEnded}

                            />
                            :
                            <LargeScreenAudioPlayer
                                playerRef={playerRef}
                                loopStage={loopStage}
                                track={track}
                                src={src}
                                onListen={updateCurrentTime}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                                onEnded={handleEnded}
                            />}
                    </>
                    : <Group justify={"space-between"}>
                        <Group>
                            <Trans
                                i18nKey={"player.insufficientPrivileges"}
                                values={{ref: track.ref}}
                                components={{b: <Text fw={"bold"}/>}}
                            />
                        </Group>
                        <PlayerCloseButton/>
                    </Group>
                }

            </>}
        </Box>
    );
}

export default BottomAudioPlayer;
