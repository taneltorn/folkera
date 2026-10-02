import React, {useContext, useEffect, useMemo, useState} from "react";
import {isEmpty} from "../utils/helpers.tsx";
import {GroupBy} from "../model/GroupBy.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {MapContext} from "../context/MapContext.tsx";
import {DefaultMapOptions} from "../utils/map.helpers.ts";
import {MapOptions} from "../model/MapOptions.ts";
import {useStatsService} from "./useStatsService.ts";
import {useDataContext} from "./useDataContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const MapContextProvider: React.FC<Properties> = ({children}) => {

    const {fetchStats} = useStatsService();
    const {filters} = useDataContext();

    const [stats, setStats] = useState<{ [key: string]: number }[]>([]);
    const [layers, setLayers] = useState<any>(null);
    const [statsLoading, setStatsLoading] = useState(false);
    const [layersLoading, setLayersLoading] = useState(false);

    const [groupBy, setGroupBy] = useLocalStorage<GroupBy>(
        "map.groupBy",
        GroupBy.PARISH
    );

    const [mapOptions, setMapOptions] = useLocalStorage<MapOptions>(
        "map.options",
        DefaultMapOptions
    );

    useEffect(() => {
        setStatsLoading(true);

        fetchStats(filters, groupBy)
            .then(setStats)
            .finally(() => setStatsLoading(false));
    }, [filters, groupBy]);

    useEffect(() => {
        const controller = new AbortController();

        setLayers(null);
        setLayersLoading(true);

        fetch(`/map-layers/${groupBy}.json`, {
            signal: controller.signal,
        })
            .then(response => response.json())
            .then(setLayers)
            .finally(() => setLayersLoading(false));

        return () => controller.abort();
    }, [groupBy]);

    const isLoading = statsLoading || layersLoading;

    const context = useMemo(
        () => ({
            stats,
            setStats,
            groupBy,
            setGroupBy,
            mapOptions,
            setMapOptions,
            layers,
            setLayers,
            isLoading,
        }),
        [stats, groupBy, mapOptions, layers, isLoading]
    );

    return (
        <MapContext.Provider value={context}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => {
    const context = useContext(MapContext);

    if (isEmpty(context)) {
        throw new Error(
            "useMapContext must be used within a MapContextProvider"
        );
    }
    return context;
};