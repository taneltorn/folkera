import React from 'react';
import {Recording} from "../model/Recording.ts";
import {LoadingState} from "../model/LoadingState.ts";

export interface Properties {

    similarRecordings: Recording[];
    setSimilarRecordings: (recordings: Recording[]) => void;

    loadingState: LoadingState;
    setLoadingState: (state: LoadingState) => void;

    findSimilarRecordings: (
        filePath: string | undefined,
        top: number,
        selfRef: string,
        removeFile: boolean
    ) => void;
}

export const SimilarRecordingsContext = React.createContext<Properties>({} as Properties);
