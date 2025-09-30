import React from 'react';
import {Button, Flex, Group} from "@mantine/core";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import LoopControls from "./LoopControls.tsx";
import TempoControls from "./TempoControls.tsx";

interface Properties {
    playerRef: any;
    src: string;
    onPlaying: () => void;
    onPause: () => void;
    onError: () => void;
    onClose: () => void;
}

const SmallScreenAudioPlayer: React.FC<Properties> = (props) => {

    const {
        src,
        playerRef,
        onPlaying,
        onPause,
        onError,
        onClose
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
                <Button
                    px={0}
                    variant={"transparent"}
                    color={"dark"}
                    onClick={onClose}
                >
                    <IoIosClose size={Size.icon.MD}/>
                </Button>
            </Group>
        </Flex>
    );

}

export default SmallScreenAudioPlayer;
