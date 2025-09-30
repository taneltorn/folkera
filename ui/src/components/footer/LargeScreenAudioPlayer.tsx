import React from 'react';
import {Button, Grid, Group, Stack, Text} from "@mantine/core";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import {Link} from "react-router-dom";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import {Recording} from "../../model/Recording.ts";
import {contentRef, truncate} from "../../utils/helpers.tsx";

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
        <Grid>
            <Grid.Col span={3}>
                <Group align="center" h="100%">
                    <Stack gap={0}>
                        <Link to={`/recordings/${track.id}`}>
                            <Text size={"md"} fw={"bold"}>
                                {track.ref}
                            </Text>
                        </Link>
                        <Text size={"sm"}>{truncate(contentRef(track), 50)}</Text>
                    </Stack>
                </Group>
            </Grid.Col>

            <Grid.Col span={6}>
                <Group align="center" h="100%">
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
            </Grid.Col>

            <Grid.Col span={3}>
                <Group justify={"end"} align="center" h="100%">
                    <Button
                        px={0}
                        variant={"transparent"}
                        color={"dark"}
                        onClick={onClose}
                    >
                        <IoIosClose size={Size.icon.MD}/>
                    </Button>
                </Group>
            </Grid.Col>
        </Grid>
    );

}

export default LargeScreenAudioPlayer;
