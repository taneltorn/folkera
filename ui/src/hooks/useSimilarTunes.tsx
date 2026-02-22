import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {Tune} from "../model/Tune.ts";
import {SimilarTunesContext} from "../context/SimilarTunesContext.tsx";
import {useIdentifyService} from "../services/useIdentifyService.ts";
import {useTuneService} from "../services/useTuneService.ts";
import {LoadingState} from "../model/LoadingState.ts";

interface Properties {
    children: React.ReactNode;
}

export const SimilarTunesContextProvider: React.FC<Properties> = ({children}) => {

    const identifyService = useIdentifyService();
    const dataService = useTuneService();

    const [similarTunes, setSimilarTunes] = useState<Tune[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

    const findSimilarTunes = async (
        filePath: string | undefined,
        top: number = 20,
        selfRef: string,
        dataset: string,
        removeFile: boolean = false
    ) => {
        if (!filePath) {
            return;
        }

        setLoadingState(LoadingState.IDENTIFYING_TUNES);

        try {
            const r = await identifyService.identify(filePath, top, selfRef, dataset);
            const distances = r.data;
            const ids = Object.keys(distances);

            setLoadingState(LoadingState.LOADING_DATA);

            const data = await dataService.fetchTunesByIds(ids);
            data.forEach((tune: Tune) => {
                tune.distance = distances[tune.id];
            });

            data.sort((a: Tune, b: Tune) => (a.distance || 0) - (b.distance || 0));
            setSimilarTunes(data);

            if (removeFile) {
                identifyService.deleteFile(filePath);
            }
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    };

    const context = useMemo(() => ({
        similarTunes: similarTunes, setSimilarTunes,
        loadingState, setLoadingState,
        findSimilarTunes
    }), [similarTunes, loadingState]);

    return (
        <SimilarTunesContext.Provider value={context}>
            {children}
        </SimilarTunesContext.Provider>
    )
}

export const useSimilarTunes = () => {
    const context = useContext(SimilarTunesContext);
    if (isEmpty(context)) {
        throw new Error('useSimilarTunes must be used within a SimilarTunesContextProvider')
    }

    return context;
};
