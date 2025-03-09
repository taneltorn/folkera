import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {GroupBy} from "../model/GroupBy.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {MapContext} from "../context/MapContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const MapContextProvider: React.FC<Properties> = ({children}) => {

    const [stats, setStats] = useState<{ [key: string]: number }[]>([]);
    const [groupBy, setGroupBy] = useLocalStorage<GroupBy>("map.groupBy", GroupBy.PARISH);

    const context = useMemo(() => ({
        stats, setStats,
        groupBy, setGroupBy,
    }), [stats, groupBy]);

    return (
        <MapContext.Provider value={context}>
            {children}
        </MapContext.Provider>
    )
}

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (isEmpty(context)) {
        throw new Error('useMapContext must be used within a MapContextProvider')
    }

    return context;
};
