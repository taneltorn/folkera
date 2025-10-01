import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {Recording} from "../model/Recording.ts";
import {SimilarRecordingsContext} from "../context/SimilarRecordingsContext.tsx";
import {useIdentifyService} from "../services/useIdentifyService.ts";
import {useDataService} from "../services/useDataService.ts";
import {LoadingState} from "../model/LoadingState.ts";

interface Properties {
    children: React.ReactNode;
}

export const SimilarRecordingsContextProvider: React.FC<Properties> = ({children}) => {

    const identifyService = useIdentifyService();
    const dataService = useDataService();

    const [similarRecordings, setSimilarRecordings] = useState<Recording[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

    const findSimilarRecordings = async (
        filePath: string | undefined,
        top: number = 20,
        selfRef: string,
        removeFile: boolean = false
    ) => {
        if (!filePath) {
            return;
        }

        setLoadingState(LoadingState.IDENTIFYING_RECORDINGS);

        try {
            const r = await identifyService.identify(filePath, top, selfRef);
            const distances = r.data;
            const ids = Object.keys(distances);

            setLoadingState(LoadingState.LOADING_DATA);

            const data = await dataService.fetchRecordingsByIds(ids);
            data.forEach((recording: Recording) => {
                recording.distance = distances[recording.id];
            });

            data.sort((a: Recording, b: Recording) => (a.distance || 0) - (b.distance || 0));
            setSimilarRecordings(data);

            if (removeFile) {
                identifyService.deleteFile(filePath);
            }
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    };
    
    const context = useMemo(() => ({
        similarRecordings, setSimilarRecordings,
        loadingState, setLoadingState,
        findSimilarRecordings
    }), [similarRecordings, loadingState]);

    return (
        <SimilarRecordingsContext.Provider value={context}>
            {children}
        </SimilarRecordingsContext.Provider>
    )
}

export const useSimilarRecordings = () => {
    const context = useContext(SimilarRecordingsContext);
    if (isEmpty(context)) {
        throw new Error('useSimilarRecordings must be used within a SimilarRecordingsContextProvider')
    }

    return context;
};
