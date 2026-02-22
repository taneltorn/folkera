import React, {createRef, useContext, useMemo, useState} from 'react';
import {AudioContext} from "../context/AudioContext.tsx";
import {isEmpty} from "../utils/helpers.tsx";
import {Tune} from "../model/Tune.ts";

interface Properties {
    children: React.ReactNode;
}

export const AudioContextProvider: React.FC<Properties> = ({children}) => {

    const playerRef = createRef();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [track, setTrack] = useState<Tune>();

    const play = (track: Tune) => {
        setTrack(track);

        if (playerRef.current) {
            // @ts-ignore
            playerRef.current.audio.current?.play();
        }
    }

    const pause = () => {
        if (playerRef.current) {
            // @ts-ignore
            playerRef.current.audio.current?.pause();
        }
    }

    const context = useMemo(() => ({
        playerRef,
        isPlaying, setIsPlaying,
        track, setTrack,
        play,
        pause,

    }), [isPlaying, track]);

    return (
        <AudioContext.Provider value={context}>
            {children}
        </AudioContext.Provider>);
}

export const useAudioPlayer = () => {
    const context = useContext(AudioContext);
    if (isEmpty(context)) {
        throw new Error('useAudioPlayer must be used within a AudioContextProvider')
    }

    return context;
};
