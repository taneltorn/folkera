import React, {useContext, useMemo, useRef, useState} from 'react';
import {AudioContext} from "../context/AudioContext.tsx";
import {isEmpty} from "../utils/helpers.tsx";
import {Tune} from "../model/Tune.ts";

interface Properties {
    children: React.ReactNode;
}

export const AudioContextProvider: React.FC<Properties> = ({children}) => {

    const playerRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loopStage, setLoopStage] = useState<number>(0);
    const [loopStart, setLoopStart] = useState<number | null>(null);
    const [loopEnd, setLoopEnd] = useState<number | null>(null);
    const [track, setTrack] = useState<Tune>();

    const play = (nextTrack: Tune) => {
        setTrack(nextTrack);
        setIsPlaying(true);
    };

    const pause = () => {
        // @ts-ignore
        playerRef.current?.audio.current?.pause();
        setIsPlaying(false);
    };

    const clearLoop = () => {
        setLoopStart(null);
        setLoopEnd(null);
        setLoopStage(0);
    }

    const context = useMemo(() => ({
        playerRef,
        isPlaying, setIsPlaying,
        loopStage, setLoopStage,
        loopStart, setLoopStart,
        loopEnd, setLoopEnd,
        track, setTrack,
        play,
        pause,
        clearLoop,

    }), [isPlaying, loopStart, loopEnd, loopStage, track]);

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
