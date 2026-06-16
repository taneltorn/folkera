import React from 'react';
import {Flex, Group} from "@mantine/core";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";
import Play from "./Play.tsx";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";

interface Properties {
    playerRef: any;
    loopStage: number | null;
    src: string;
    onPlaying: () => void;
    onPause: () => void;
    onError: () => void;
}

const SmallScreenAudioPlayer: React.FC<Properties> = (props) => {

    const {
        src,
        playerRef,
        onPlaying,
        onPause,
        onError,
    } = {...props};

    const {isPlaying, loopLeft, loopWidth, isLooping} = useAudioPlayer();

    return (
        <Flex>
            <Group
                flex={1}
                className={isLooping ? "looping-player" : ""}
                style={{
                    "--loop-left": loopLeft,
                    "--loop-width": loopWidth,
                } as React.CSSProperties}
            >
                <AudioPlayer
                    // @ts-ignore
                    ref={playerRef}
                    autoPlayAfterSrcChange={false}
                    autoPlay={isPlaying}
                    showSkipControls={false}
                    layout={"horizontal-reverse"}
                    customVolumeControls={[]}
                    customControlsSection={[
                        RHAP_UI.ADDITIONAL_CONTROLS
                    ]}
                    customProgressBarSection={
                        [RHAP_UI.PROGRESS_BAR]
                    }
                    customAdditionalControls={[
                        <LoopControls/>,
                        <Play/>,
                        <TempoControls playerRef={playerRef}/>
                    ]}
                    src={src}
                    onPlaying={onPlaying}
                    onPause={onPause}
                    onError={onError}
                />
            </Group>

            <Group justify={"end"}>
                <PlayerCloseButton/>
            </Group>
        </Flex>
    );

}

export default SmallScreenAudioPlayer;
