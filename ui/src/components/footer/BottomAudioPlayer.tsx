import React from 'react';
import {Button, CopyButton, Group, SimpleGrid, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/common.constants.ts";
import AudioPlayer from "react-h5-audio-player";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useTranslation} from "react-i18next";
import {MdCopyAll} from "react-icons/md";
import {truncate} from "../../utils/common.helpers.tsx";

const BottomAudioPlayer: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth()
    const {track, setTrack, setIsPlaying, playerRef} = useAudioPlayer();

    return (
        <SimpleGrid cols={3} py={"md"}>
            {currentUser?.isUser && track 
                ? <>
                    <Group px={"md"} gap={0} title={track?.file} wrap={"nowrap"}>
                        <CopyButton value={track.ref}>
                            {({ copied, copy }) => (
                                <Button
                                    px={0}
                                    mr={"md"}
                                    variant={"transparent"}
                                    size={"compact-xs"}
                                    color={copied ? 'teal' : 'gray'}
                                    onClick={copy}
                                >
                                    <MdCopyAll size={Size.icon.MD} />
                                </Button>
                            )}
                        </CopyButton>
                        <Text size={"sm"}>
                            {`${track.ref} - ${truncate(track.content)} < ${track.parish} < ${truncate(track.performer)} (${track.year})`}
                        </Text>
                    </Group>
                    <AudioPlayer
                        // @ts-ignore
                        ref={playerRef}
                        autoPlay
                        layout={"horizontal-reverse"}
                        showJumpControls={false}

                        customVolumeControls={[]}
                        customAdditionalControls={[]}
                        src={`mp3/${track?.file}`}
                        onPlaying={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                    {/*<Group>*/}
                    {/*    <Text size={"xs"}>{track.file?.split("/").slice(-1)}</Text>*/}
                    {/*</Group>*/}
                </>
                : <>
                    <Group px={"md"}>
                        {t("player.insufficientPrivileges")}
                    </Group>
                    <Group/>
                </>}
            <Group px={"md"} justify={"end"}>
                <Button px={2} variant={"subtle"} color={"dark"} onClick={() => setTrack(undefined)}>
                    <IoIosClose size={Size.icon.XL}/>
                </Button>
            </Group>
        </SimpleGrid>
    );
}

export default BottomAudioPlayer;
