import React from 'react';
import {Tune} from "../model/Tune.ts";

export interface Properties {
    playerRef: any;

    loopStage: number;
    setLoopStage: (value: number) => void;

    loopStart: number | null;
    setLoopStart: (value: number | null) => void;

    loopEnd: number | null;
    setLoopEnd: (value: number | null) => void;

    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;

    track?: Tune;
    setTrack: (value: Tune | undefined) => void;

    play: (track: Tune) => void;
    pause: () => void;
    clearLoop: () => void;
}

export const AudioContext = React.createContext<Properties>({} as Properties);
