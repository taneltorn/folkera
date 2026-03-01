import React, {useContext, useMemo, useState} from 'react';
import {isEmpty, parseDistances, stringifyDistances} from "../utils/helpers.tsx";
import {Tune} from "../model/Tune.ts";
import {SimilarTunesContext} from "../context/SimilarTunesContext.tsx";
import {useIdentifyService} from "../services/useIdentifyService.ts";
import {useTuneService} from "../services/useTuneService.ts";
import {LoadingState} from "../model/LoadingState.ts";
import {DistanceBreakpoint} from "../model/DistanceBreakpoint.ts";
import {IdentifyOptions} from "../model/IdentifyOptions.ts";
import {ToastType} from "../context/ToastContext.tsx";
import {useTranslation} from "react-i18next";
import {useToasts} from "./useToasts.tsx";

interface Properties {
    children: React.ReactNode;
}

export const SimilarTunesContextProvider: React.FC<Properties> = ({children}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const identifyService = useIdentifyService();
    const dataService = useTuneService();

    const [similarTunes, setSimilarTunes] = useState<Tune[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

    const fetchTunes = async (ids: string[], distances: Record<string, number>): Promise<Tune[]> => {
        setLoadingState(LoadingState.LOADING_DATA);

        const data = await dataService.fetchTunesByIds(ids);

        return data
            .map((tune) => ({...tune, distance: distances[tune.id]}))
            .filter((t) => t.distance != null && t.distance < DistanceBreakpoint.DISREGARD)
            .sort((a, b) => (a.distance ?? Number.POSITIVE_INFINITY) - (b.distance ?? Number.POSITIVE_INFINITY));
    };

    const fetchDistances = async (options: IdentifyOptions): Promise<Record<string, number>> => {
        setLoadingState(LoadingState.IDENTIFYING_TUNES);

        const r = await identifyService.identify(options.filePath, options.top, options.selfRef, options.dataset);

        if (!r.data) throw new Error("No distances found");
        return r.data as Record<string, number>;
    };

    const loadSimilarTunes = async (
        options: IdentifyOptions,
        initialDistances?: string,
        ref?: Tune,
    ): Promise<void> => {
        try {
            const distances = initialDistances
                ? parseDistances(initialDistances)
                : await fetchDistances(options);

            const ids: string[] = Object.keys(distances);
            const tunes = await fetchTunes(ids, distances);

            setSimilarTunes(tunes);
            setLoadingState(LoadingState.IDLE);

            if (ref && !initialDistances) {
                ref.distances = stringifyDistances(distances);
                dataService.saveTunes([ref])
                    .catch(error => {
                        notify(t("toast.error.saveData"), ToastType.ERROR, error);
                    });
            }

        } catch (e) {
            console.log(e);
            setLoadingState(LoadingState.ERROR);
        }
    };

    const isBusy = useMemo<boolean>(() => {
        return [
            LoadingState.LOADING_DATA,
            LoadingState.IDENTIFYING_TUNES,
            LoadingState.UPLOADING_FILE].includes(loadingState) || false;
    }, [loadingState]);

    const context = useMemo(() => ({
        similarTunes: similarTunes, setSimilarTunes,
        loadingState, setLoadingState,
        loadSimilarTunes,
        isBusy,
    }), [similarTunes, isBusy, loadingState]);


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
