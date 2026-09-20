import React from "react";
import {Flex, Group} from "@mantine/core";
import {RHAP_UI} from "react-h5-audio-player";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";
import Play from "./Play.tsx";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Tune} from "../../model/Tune.ts";
import BaseAudioPlayer, {
    BaseAudioPlayerProperties,
} from "./BaseAudioPlayer.tsx";

interface Properties extends BaseAudioPlayerProperties {
    track: Tune;
}

const SmallScreenAudioPlayer: React.FC<Properties> = ({
                                                          track,
                                                          ...playerProps
                                                      }) => {

    const {
        loopLeft,
        loopWidth,
        loopStage,
    } = useAudioPlayer();

    return (
        <Flex>
            <Group
                flex={1}
                className={loopStage > 0 ? "looping-player" : ""}
                style={{
                    "--loop-left": loopLeft,
                    "--loop-width": loopWidth,
                } as React.CSSProperties}
            >
                <BaseAudioPlayer
                    {...playerProps}
                    layout="horizontal-reverse"
                    customProgressBarSection={[
                        RHAP_UI.PROGRESS_BAR,
                    ]}
                    customAdditionalControls={[
                        <LoopControls key="loop"/>,
                        <Play key="play"/>,
                        <TempoControls
                            key="tempo"
                            playerRef={playerProps.playerRef}
                            track={track}
                        />,
                    ]}
                />
            </Group>

            <Group justify="end">
                <PlayerCloseButton/>
            </Group>
        </Flex>
    );
};

export default SmallScreenAudioPlayer;