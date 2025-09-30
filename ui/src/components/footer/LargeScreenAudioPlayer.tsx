import React from 'react';
import {Button, Group, SimpleGrid, Stack, Text} from "@mantine/core";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import {Link} from "react-router-dom";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import {Recording} from "../../model/Recording.ts";
import {fullRef} from "../../utils/helpers.tsx";

interface Properties {
    playerRef: any;
    track: Recording;
    src: string;
    onPlaying: () => void;
    onPause: () => void;
    onError: () => void;
    onClose: () => void;
}

const LargeScreenAudioPlayer: React.FC<Properties> = (props) => {

    const {
        track,
        src,
        playerRef,
        onPlaying,
        onPause,
        onError,
        onClose
    } = {...props};

    return (
        <SimpleGrid cols={3}>
            <Group>
                <Stack gap={0}>
                    <Link to={`/recordings/${track.id}`}>
                        <Text size={"md"} fw={"bold"}>
                            {track.ref}
                        </Text>
                    </Link>
                    <Text size={"sm"}>{fullRef(track)}</Text>
                </Stack>
            </Group>

            <Group>
                <AudioPlayer
                    // @ts-ignore
                    ref={playerRef}
                    autoPlay={true}
                    layout={"stacked-reverse"}
                    customControlsSection={[
                        RHAP_UI.ADDITIONAL_CONTROLS
                    ]}
                    customProgressBarSection={
                        [RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]
                    }
                    customVolumeControls={[]}
                    customAdditionalControls={[
                        <LoopControls/>,
                        RHAP_UI.MAIN_CONTROLS,
                        <TempoControls playerRef={playerRef}/>
                    ]}
                    src={src}
                    onPlaying={onPlaying}
                    onPause={onPause}
                    onError={onError}
                />
            </Group>

            <Group justify={"end"}>
                <Button
                    px={0}
                    variant={"transparent"}
                    color={"dark"}
                    onClick={onClose}
                >
                    <IoIosClose size={Size.icon.MD}/>
                </Button>
            </Group>
        </SimpleGrid>
    );

}

export default LargeScreenAudioPlayer;
