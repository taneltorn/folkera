import React, {useEffect, useState} from 'react';
import {Box, Button, Group, Menu, Slider, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {IoIosClose, IoIosSpeedometer} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import AudioPlayer from "react-h5-audio-player";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Trans, useTranslation} from "react-i18next";
import {truncate} from "../../utils/helpers.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {MdClear, MdLoop} from "react-icons/md";
import {TbArrowBarToRight} from 'react-icons/tb';

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {notify} = useNotifications();
    const {track, setTrack, setIsPlaying, playerRef} = useAudioPlayer();

    const [tempo, setTempo] = useState<number>(1);
    const [loopStage, setLoopStage] = useState<0 | 1 | 2>(0);
    const [loopStart, setLoopStart] = useState<number | null>(null);
    const [loopEnd, setLoopEnd] = useState<number | null>(null);

    const handlePlay = () => {
        console.log("Playing file:", `${import.meta.env.VITE_RECORDINGS_DIR}/${track?.file}`);
    }

    const handlePlaybackError = () => {
        notify(t("toast.error.playbackError", {file: track?.file || ""}), NotificationType.ERROR)
        setIsPlaying(false);
    }

    const handleLoopClick = () => {
        const audio = playerRef.current?.audio?.current;
        if (!audio) return;

        if (loopStage === 0) {
            setLoopStart(audio.currentTime);
            setLoopStage(1);
        } else if (loopStage === 1) {
            setLoopEnd(audio.currentTime);
            setLoopStage(2);
        } else {
            clearLoop();
        }
    };

    const clearLoop = () => {
        setLoopStart(null);
        setLoopEnd(null);
        setLoopStage(0);
    }

    useEffect(() => {
        setTempo(1);
        clearLoop();
    }, [track]);

    useEffect(() => {
        const audio = playerRef.current?.audio?.current;
        if (!audio || loopStart === null || loopEnd === null) return;

        const onTimeUpdate = () => {
            if (audio.currentTime >= loopEnd!) {
                audio.currentTime = loopStart!;
            }
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        return () => audio.removeEventListener("timeupdate", onTimeUpdate);
    }, [loopStart, loopEnd, playerRef]);


    useEffect(() => {
        // @ts-ignore
        if (playerRef.current?.audio?.current) {
            // @ts-ignore
            playerRef.current.audio.current.playbackRate = tempo;
        }
    }, [tempo, playerRef]);

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
                            ? <Group flex={1} wrap={"nowrap"} className={loopStage > 1 ? "looping" : ""}>
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
                                <Group gap={0} wrap={"nowrap"}>
                                    <Menu>
                                        <Menu.Target>
                                            <Button
                                                title={t("player.tempo")}
                                                size={"compact-md"}
                                                color={tempo === 1 ? "dark.2" : "red"}
                                                variant={"transparent"}
                                            >
                                                <IoIosSpeedometer size={Size.icon.XL}/>
                                            </Button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Box px={"xl"} py={"xs"} mb={"md"}>
                                                <Slider
                                                    w={150}
                                                    min={0.5}
                                                    max={1.5}
                                                    step={0.05}
                                                    value={tempo}
                                                    onChange={setTempo}
                                                    marks={[
                                                        {value: 0.5, label: "0.5x"},
                                                        {value: 1.0, label: "1x"},
                                                        {value: 1.5, label: "1.5x"},
                                                    ]}
                                                />
                                            </Box>
                                        </Menu.Dropdown>
                                    </Menu>
                                    <Button
                                        color={loopStage === 0 ? "dark.2" : "red"}
                                        title={t(`player.loop.${loopStage}`)}
                                        size={"compact-md"}
                                        variant={"transparent"}
                                        onClick={handleLoopClick}
                                    >
                                        {loopStage === 0 && <MdLoop size={Size.icon.XL}/>}
                                        {loopStage === 1 &&
                                            <TbArrowBarToRight size={Size.icon.XL}/>} {/* Start set, waiting for end */}
                                        {loopStage === 2 && <MdClear size={Size.icon.XL}/>} {/* Looping */}
                                    </Button>
                                </Group>
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
