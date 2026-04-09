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

const audioUrl = `${import.meta.env.VITE_API_URL}/tunes/audio`;

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {notify} = useToasts();
    const breakpoint = useCurrentBreakpoint();
    const {track, isPlaying, playerRef, setIsPlaying, loopStage} = useAudioPlayer();
    const {index} = useActiveVariant();

    const audios = track?.audio?.split(";") || [];
    const audio = audios[index] || audios[0];

    const src = `${audioUrl}?filename=${encodeURIComponent(audio || "")}`;

    const handlePlaybackError = () => {
        notify(t("toast.error.playbackError", {file: audio || ""}), ToastType.ERROR)
        setIsPlaying(false);
    }

    useEffect(() => {
        const audio = playerRef.current?.audio.current;
        if (!audio || !track) return;

        if (isPlaying) {
            audio.play().catch(() => {
                console.log("Playback error");
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [track,  isPlaying]);

    return (
        <Box py={4} px={"xs"}>
            {!currentUser?.isUser ? <Group justify={"space-between"}>
                    <Group>
                        <Trans
                            i18nKey={"player.insufficientPrivileges"}
                            values={{ref: track?.ref || ""}}
                            components={{b: <Text fw={"bold"}/>}}
                        />
                    </Group>
                    <PlayerCloseButton/>
                </Group>
                : <>
                    {track && <>
                        {["xs"].includes(breakpoint) ?
                            <SmallScreenAudioPlayer
                                playerRef={playerRef}
                                loopStage={loopStage}
                                src={src}
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
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                            />}

                    </>}
                </>
            }
        </Box>
    )
        ;
}

export default BottomAudioPlayer;
