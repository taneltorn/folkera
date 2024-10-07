import React, {createRef, useContext, useMemo, useState} from 'react';
import {Recording} from '../model/Recording';
import {AudioContext} from "../context/AudioContext.tsx";
import {isEmpty} from "../utils/common.helpers.tsx";

interface Properties {
    children: React.ReactNode;
}

export const AudioContextProvider: React.FC<Properties> = ({children}) => {

    const playerRef = createRef();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [track, setTrack] = useState<Recording>();

    const play = (track: Recording) => {
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
