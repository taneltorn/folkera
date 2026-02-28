import React from 'react';
import {Tune} from "../model/Tune.ts";
import {LoadingState} from "../model/LoadingState.ts";

export interface Properties {

    isBusy: boolean;
    similarTunes: Tune[];
    setSimilarTunes: (tunes: Tune[]) => void;

    loadingState: LoadingState;
    setLoadingState: (state: LoadingState) => void;

    findSimilarTunes: (
        filePath: string | undefined,
        top: number,
        selfRef: string,
        dataset: string,
        removeFile: boolean
    ) => void;
}

export const SimilarTunesContext = React.createContext<Properties>({} as Properties);
