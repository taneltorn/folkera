import React from 'react';
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

const audioUrl = `${import.meta.env.VITE_API_URL}/recordings/audio`;

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {notify} = useToasts();
    const {track, setIsPlaying, playerRef} = useAudioPlayer();
    const breakpoint = useCurrentBreakpoint();

    const handlePlaybackError = () => {
        notify(t("toast.error.playbackError", {file: track?.file || ""}), ToastType.ERROR)
        setIsPlaying(false);
    }

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
                                src={`${audioUrl}?filename=${encodeURIComponent(track.file || "")}`}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                            />
                            :
                            <LargeScreenAudioPlayer
                                playerRef={playerRef}
                                track={track}
                                src={`${audioUrl}?filename=${encodeURIComponent(track.file || "")}`}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                            />}

                    </>}
                </>}
        </Box>
    );
}

export default BottomAudioPlayer;
