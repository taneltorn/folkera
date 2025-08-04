import React from 'react';
import {ColorScheme} from "../model/ColorScheme.ts";
import {ClusterPlot} from "../model/ClusterPlot.ts";

export interface Properties {

    colorScheme: ColorScheme;
    setColorScheme: (value: ColorScheme) => void;

    clusterPlot: ClusterPlot;
    setClusterPlot: (value: ClusterPlot) => void;

    activeWork: string | null;
    setActiveWork: (value: string | null) => void;
}

export const ClusterContext = React.createContext<Properties>({} as Properties);
