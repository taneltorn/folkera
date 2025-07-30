import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {ClusterContext} from '../context/ClusterContext.tsx';
import {ColorScheme} from "../model/ColorScheme.ts";
import {ClusterPlots, ColorSchemes} from "../utils/lists.ts";
import {ClusterPlot} from "../model/ClusterPlot.ts";
import {ClusterDataMode} from "../model/ClusterDataMode.ts";

interface Properties {
    children: React.ReactNode;
}

export const ClusterContextProvider: React.FC<Properties> = ({children}) => {

    const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorSchemes[2]);
    const [clusterPlot, setClusterPlot] = useState<ClusterPlot>(ClusterPlots[0]);
    const [clusterDataMode, setClusterDataMode] = useState<ClusterDataMode>(ClusterDataMode.ALL);
    const [activeWork, setActiveWork] = useState<string | null>(null);

    const context = useMemo(() => ({
        colorScheme, setColorScheme,
        clusterPlot, setClusterPlot,
        clusterDataMode, setClusterDataMode,
        activeWork, setActiveWork
    }), [colorScheme, clusterPlot, clusterDataMode, activeWork]);

    return (
        <ClusterContext.Provider value={context}>
            {children}
        </ClusterContext.Provider>
    )
}

export const useClusterContext = () => {
    const context = useContext(ClusterContext);
    if (isEmpty(context)) {
        throw new Error('useClusterContext must be used within a ClusterContextProvider')
    }

    return context;
};
