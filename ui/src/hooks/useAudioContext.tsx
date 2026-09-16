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
    const [currentTime, setCurrentTime] = useState(0);

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

    const reset = () => {
        // @ts-ignore
        const audio = playerRef.current?.audio.current;

        if (audio) {
            audio.currentTime = 0;
        }
    };

    // @ts-ignore
    const duration = playerRef.current?.audio?.current?.duration || 0;

    const loopLeft =
        duration && loopStart !== null
            ? `${(loopStart / duration) * 100}%`
            : "0%";

    const loopWidth =
        duration && loopStart !== null
            ? loopStage === 1
                ? `${(Math.max(currentTime, loopStart) - loopStart) / duration * 100}%`
                : loopEnd !== null
                    ? `${Math.max(0, loopEnd - loopStart) / duration * 100}%`
                    : "0%"
            : "0%";

    const isLooping = loopStage === 2 && loopStart !== null && loopEnd !== null;

    const context = useMemo(() => ({
        playerRef,
        currentTime, setCurrentTime,
        isPlaying, setIsPlaying,
        loopStage, setLoopStage,
        loopStart, setLoopStart,
        loopEnd, setLoopEnd,
        loopLeft,
        loopWidth,
        isLooping,
        track, setTrack,
        play,
        pause,
        clearLoop,
        reset,
    }), [isPlaying, currentTime, loopStart, loopEnd, loopStage, track]);

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
