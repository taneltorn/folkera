import React from 'react';
import {Recording} from "../model/Recording.ts";

export interface Properties {
    playerRef: any;

    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;

    track?: Recording;
    setTrack: (value: Recording | undefined) => void;

    play: (track: Recording) => void;
    pause: () => void;
}

export const AudioContext = React.createContext<Properties>({} as Properties);
