import React from 'react';
import {Flex, Group} from "@mantine/core";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";
import Play from "./Play.tsx";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Tune} from "../../model/Tune.ts";

interface Properties {
    playerRef: any;
    track: Tune;
    loopStage: number | null;
    src: string;
    onPlaying: () => void;
    onPause: () => void;
    onError: () => void;
    onEnded: () => void;
    onListen: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
}

const SmallScreenAudioPlayer: React.FC<Properties> = (props) => {

    const {
        src,
        track,
        playerRef,
        onEnded,
        onPlaying,
        onPause,
        onError,
        onListen,
    } = {...props};

    const {isPlaying, loopLeft, loopWidth, loopStage} = useAudioPlayer();

    // @ts-ignore
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
                <AudioPlayer
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
                        <TempoControls playerRef={playerRef} track={track}/>
                    ]}
                    src={src}
                    onPlaying={onPlaying}
                    onPause={onPause}
                    onError={onError}
                    onEnded={onEnded}
                    // @ts-ignore
                    onListen={onListen}
                />
            </Group>

            <Group justify={"end"}>
                <PlayerCloseButton/>
            </Group>
        </Flex>
    );

}

export default SmallScreenAudioPlayer;
