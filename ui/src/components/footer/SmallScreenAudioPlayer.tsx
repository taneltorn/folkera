import React from 'react';
import {Flex, Group} from "@mantine/core";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";
import PlayerCloseButton from "./PlayerCloseButton.tsx";

interface Properties {
    playerRef: any;
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

    return (
        <Flex>
            <Group flex={1}>
                <AudioPlayer
                    // @ts-ignore
                    ref={playerRef}
                    autoPlay={true}
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
                <PlayerCloseButton/>
            </Group>
        </Flex>
    );

}

export default SmallScreenAudioPlayer;
