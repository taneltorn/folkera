import React, {useEffect} from 'react';
import {Box, Group, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Trans, useTranslation} from "react-i18next";
import {useToasts} from "../../hooks/useToasts.tsx";
import {ToastType} from "../../context/ToastContext.tsx";
import useCurrentBreakpoint from "../../hooks/useCurrentBreakPoint.tsx";
import LargeScreenAudioPlayer from "./LargeScreenAudioPlayer.tsx";
import SmallScreenAudioPlayer from "./SmallScreenAudioPlayer.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";
import {useActiveVariant} from "../../hooks/useActiveVariant.tsx";

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {notify} = useToasts();
    const breakpoint = useCurrentBreakpoint();
    const {track, isPlaying, playerRef, setIsPlaying, loopStage, setCurrentTime} = useAudioPlayer();
    const {index} = useActiveVariant();

    const audios = track?.audio?.split(";") || [];
    const audio = audios[index] || audios[0];

    const src = track
        ? `${import.meta.env.VITE_API_URL}/tunes/${track.id}/audio?variant=${index}`
        : "";

    const handlePlaybackError = () => {
        notify(t("toast.error.playbackError", {file: audio || ""}), ToastType.ERROR)
        setIsPlaying(false);
    }

    const updateCurrentTime = (event: React.SyntheticEvent<HTMLAudioElement>) => {
        setCurrentTime(event.currentTarget.currentTime);
    };

    useEffect(() => {
        if (!track) return;

        setCurrentTime(playerRef.current?.audio?.current?.duration || 0);

        const timeout = window.setTimeout(() => {
            const audio = playerRef.current?.audio.current;
            if (!audio) return;

            if (isPlaying) {
                audio.play().catch(() => {
                    console.log("Playback error");
                    setIsPlaying(false);
                });
            } else {
                audio.pause();
            }
        }, 0);

        return () => window.clearTimeout(timeout);
    }, [track, src, isPlaying, playerRef, setIsPlaying]);

    return (

        <Box py={4} px={"xs"}>
            {track && <>
                {currentUser?.isUser || track.access === "OPEN"
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
