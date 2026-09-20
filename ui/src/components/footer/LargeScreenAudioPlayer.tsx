import React from "react";
import {
    Grid,
    Group,
    Stack,
    Text,
    useMantineTheme,
} from "@mantine/core";
import {RHAP_UI} from "react-h5-audio-player";
import {Link} from "react-router-dom";
import {LuAudioLines} from "react-icons/lu";
import {IoMusicalNotes} from "react-icons/io5";

import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";
import PlayNext from "./PlayNext.tsx";
import PlayPrevious from "./PlayPrevious.tsx";
import Play from "./Play.tsx";
import BaseAudioPlayer, {
    BaseAudioPlayerProperties,
} from "./BaseAudioPlayer.tsx";

import {Tune} from "../../model/Tune.ts";
import {contentRef, truncate} from "../../utils/helpers.tsx";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";

interface Properties extends BaseAudioPlayerProperties {
    track: Tune;
}

const LargeScreenAudioPlayer: React.FC<Properties> = ({
                                                          track,
                                                          ...playerProps
                                                      }) => {

    const theme = useMantineTheme();

    const {
        loopLeft,
        loopWidth,
        loopStage,
    } = useAudioPlayer();

    const Icon =
        track.datatype === "AUDIO"
            ? LuAudioLines
            : IoMusicalNotes;

    return (
        <Grid>
            <Grid.Col span={3}>
                <Group
                    align="center"
                    h="100%"
                    wrap="nowrap"
                >
                    {track.datatype && (
                        <Icon
                            color={
                                theme.colors[
                                    theme.primaryColor
                                    ][9]
                            }
                            size={30}
                        />
                    )}

                    <Stack gap={0}>
                        <Link to={`/tunes/${track.id}`}>
                            <Text
                                size="md"
                                fw="bold"
                            >
                                {track.ref}
                            </Text>
                        </Link>

                        <Text size="sm">
                            {truncate(
                                contentRef(track),
                                40
                            )}
                        </Text>
                    </Stack>
                </Group>
            </Grid.Col>

            <Grid.Col span={6}>
                <Group
                    align="center"
                    h={80}
                    className={
                        loopStage > 0
                            ? "looping-player"
                            : ""
                    }
                    style={{
                        "--loop-left": loopLeft,
                        "--loop-width": loopWidth,
                    } as React.CSSProperties}
                >
                    <BaseAudioPlayer
                        {...playerProps}
                        layout="stacked-reverse"
                        customProgressBarSection={[
                            RHAP_UI.CURRENT_TIME,
                            RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.DURATION,
                        ]}
                        customAdditionalControls={[
                            <LoopControls key="loop"/>,
                            <PlayPrevious key="previous"/>,
                            <Play key="play"/>,
                            <PlayNext key="next"/>,
                            <TempoControls
                                key="tempo"
                                playerRef={playerProps.playerRef}
                                track={track}
                            />,
                        ]}
                    />
                </Group>
            </Grid.Col>

            <Grid.Col span={3}>
                <Group
                    justify="end"
                    align="center"
                    h="100%"
                >
                    <PlayerCloseButton/>
                </Group>
            </Grid.Col>
        </Grid>
    );
};

export default LargeScreenAudioPlayer;