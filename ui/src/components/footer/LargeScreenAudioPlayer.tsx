import React from 'react';
import {Grid, Group, Stack, Text} from "@mantine/core";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import {Link} from "react-router-dom";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import {Tune} from "../../model/Tune.ts";
import {contentRef, truncate} from "../../utils/helpers.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";

interface Properties {
    playerRef: any;
    track: Tune;
    src: string;
    onPlaying: () => void;
    onPause: () => void;
    onError: () => void;
}

const LargeScreenAudioPlayer: React.FC<Properties> = (props) => {

    const {
        track,
        src,
        playerRef,
        onPlaying,
        onPause,
        onError,
    } = {...props};

    return (
        <Grid>
            <Grid.Col span={3}>
                <Group align="center" h="100%">
                    <Stack gap={0}>
                        <Link to={`/tunes/${track.id}`}>
                            <Text size={"sm"} fw={"bold"}>
                                {track.ref}
                            </Text>
                        </Link>
                        <Text size={"sm"}>{truncate(contentRef(track), 40)}</Text>
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
                    <PlayerCloseButton/>
                </Group>
            </Grid.Col>
        </Grid>
    );

}

export default LargeScreenAudioPlayer;
