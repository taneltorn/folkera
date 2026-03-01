import React from 'react';
import {Tune} from "../model/Tune.ts";
import {LoadingState} from "../model/LoadingState.ts";
import {IdentifyOptions} from "../model/IdentifyOptions.ts";

export interface Properties {

    isBusy: boolean;
    similarTunes: Tune[];
    setSimilarTunes: (tunes: Tune[]) => void;

    loadingState: LoadingState;
    setLoadingState: (state: LoadingState) => void;

    loadSimilarTunes: (options: IdentifyOptions, initialDistances?: string, ref?: Tune) => void;
}

export const SimilarTunesContext = React.createContext<Properties>({} as Properties);
