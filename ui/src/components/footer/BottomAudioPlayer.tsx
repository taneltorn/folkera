import React from 'react';
import {Box, Button, Group, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import AudioPlayer from "react-h5-audio-player";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Trans, useTranslation} from "react-i18next";
import {truncate} from "../../utils/helpers.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {notify} = useNotifications();
    const {track, setTrack, setIsPlaying, playerRef} = useAudioPlayer();

    const handlePlay = () => {
        console.log("Playing file:", `${import.meta.env.VITE_RECORDINGS_DIR}/${track?.file}`);
    }

    const handlePlaybackError = () => {
        notify(t("toast.error.playbackError", {file: track?.file || ""}), NotificationType.ERROR)
        setIsPlaying(false);
    }

    const audioUrl = `${import.meta.env.VITE_API_URL}/recordings/audio`;

    return (<Box py={"xs"}>
            {track &&
                <Group px={"xs"} justify={"space-between"}>
                    <Group visibleFrom={"md"} flex={{base: 0, sm: 1}} wrap={"nowrap"}>
                        <Text size={"sm"}>
                            {`${track.ref} - ${truncate(track.content, 30)} < ${track.parish} < ${truncate(track.performer, 30)} (${track.year})`}
                        </Text>
                    </Group>

                    <>
                        {currentUser?.isUser && track
                            ? <Group flex={1}>
                                <AudioPlayer
                                    // @ts-ignore
                                    ref={playerRef}
                                    autoPlay={true}
                                    layout={"horizontal-reverse"}
                                    showJumpControls={false}
                                    customVolumeControls={[]}
                                    customAdditionalControls={[]}
                                    src={`${audioUrl}?filename=${encodeURIComponent(track.file || "")}`}
                                    onPlay={handlePlay}
                                    onPlaying={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onError={handlePlaybackError}
                                />
                            </Group>
                            : <>
                                <Group px={"md"}>
                                    <Trans
                                        i18nKey={"player.insufficientPrivileges"}
                                        values={{ref: track?.ref || ""}}
                                        components={{b: <Text fw={"bold"}/>}}
                                    />
                                </Group>
                                <Group/>
                            </>}
                    </>
                    <Group flex={{base: 0, md: 1}} justify={"flex-end"} wrap={"nowrap"}>
                        <Button px={2} variant={"subtle"} color={"dark"} onClick={() => setTrack(undefined)}>
                            <IoIosClose size={Size.icon.XL}/>
                        </Button>
                    </Group>
                </Group>}
        </Box>

    );
}

export default BottomAudioPlayer;
