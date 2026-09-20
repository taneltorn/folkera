import React from "react";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";

export interface BaseAudioPlayerProperties {
    playerRef: any;
    src: string;
    onPlaying: () => void;
    onPause: () => void;
    onError: () => void;
    onEnded: () => void;
    onListen: (event: Event) => void;
}

interface Properties extends BaseAudioPlayerProperties {
    layout:
        | "horizontal"
        | "horizontal-reverse"
        | "stacked"
        | "stacked-reverse";

    customProgressBarSection: React.ReactNode[];
    customAdditionalControls: React.ReactNode[];
}

const BaseAudioPlayer: React.FC<Properties> = ({
                                                   playerRef,
                                                   src,
                                                   layout,
                                                   customProgressBarSection,
                                                   customAdditionalControls,
                                                   onPlaying,
                                                   onPause,
                                                   onError,
                                                   onEnded,
                                                   onListen,
                                               }) => {

    const {isPlaying} = useAudioPlayer();

    return (
        // @ts-ignore
        <AudioPlayer
            ref={playerRef}
            autoPlayAfterSrcChange={false}
            autoPlay={isPlaying}
            showSkipControls={false}
            layout={layout}
            customVolumeControls={[]}
            customControlsSection={[
                RHAP_UI.ADDITIONAL_CONTROLS,
            ]}
            customProgressBarSection={customProgressBarSection}
            customAdditionalControls={customAdditionalControls}
            src={src}
            onPlaying={onPlaying}
            onPause={onPause}
            onError={onError}
            onEnded={onEnded}
            onListen={onListen}
        />
    );
};

export default BaseAudioPlayer;