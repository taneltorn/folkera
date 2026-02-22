import React from 'react';
import {Tune} from "../model/Tune.ts";

export interface Properties {
    playerRef: any;

    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;

    track?: Tune;
    setTrack: (value: Tune | undefined) => void;

    play: (track: Tune) => void;
    pause: () => void;
}

export const AudioContext = React.createContext<Properties>({} as Properties);
