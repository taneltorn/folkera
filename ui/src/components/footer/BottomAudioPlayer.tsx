import React from 'react';
import {Box, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Trans, useTranslation} from "react-i18next";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import useCurrentBreakpoint from "../../hooks/useCurrentBreakPoint.tsx";
import LargeScreenAudioPlayer from "./LargeScreenAudioPlayer.tsx";
import SmallScreenAudioPlayer from "./SmallScreenAudioPlayer.tsx";

const audioUrl = `${import.meta.env.VITE_API_URL}/recordings/audio`;

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {notify} = useNotifications();
    const {track, setTrack, setIsPlaying, playerRef} = useAudioPlayer();
    const breakpoint = useCurrentBreakpoint();

    const handlePlaybackError = () => {
        notify(t("toast.error.playbackError", {file: track?.file || ""}), NotificationType.ERROR)
        setIsPlaying(false);
    }

    return (
        <Box py={4} px={"xs"}>
            {!currentUser?.isUser ?
                <Trans
                    i18nKey={"player.insufficientPrivileges"}
                    values={{ref: track?.ref || ""}}
                    components={{b: <Text fw={"bold"}/>}}
                />
                : <>
                    {track && <>
                        {["xs"].includes(breakpoint) ?
                            <SmallScreenAudioPlayer
                                playerRef={playerRef}
                                src={`${audioUrl}?filename=${encodeURIComponent(track.file || "")}`}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                                onClose={() => setTrack(undefined)}
                            />
                            :
                            <LargeScreenAudioPlayer
                                playerRef={playerRef}
                                track={track}
                                src={`${audioUrl}?filename=${encodeURIComponent(track.file || "")}`}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onError={handlePlaybackError}
                                onClose={() => setTrack(undefined)}
                            />}

                    </>}
                </>}
        </Box>
    );
}

export default BottomAudioPlayer;
