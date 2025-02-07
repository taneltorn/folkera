import React from 'react';
import {Button, Group, SimpleGrid, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/common.constants.ts";
import AudioPlayer from "react-h5-audio-player";

const BottomAudioPlayer: React.FC = () => {

    const {track, setTrack, setIsPlaying, playerRef} = useAudioPlayer();

    return (
        <SimpleGrid cols={3} py={"md"}>
            <Group px={"md"} gap={0}>
                {track && <>
                    <Text size={"sm"}>
                        {`${track.ref} - ${track.content} < ${track.location} < ${track.performer} (${track.year})`}
                    </Text>
                    <Text size={"xs"}>{track.file?.split("/").slice(-1)}</Text>
                </>}
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

            <Group px={"md"} justify={"end"}>
                <Button px={2} variant={"subtle"} color={"dark"} onClick={() => setTrack(undefined)}>
                    <IoIosClose size={Size.icon.XL}/>
                </Button>
            </Group>

        </SimpleGrid>
    );
}

export default BottomAudioPlayer;
