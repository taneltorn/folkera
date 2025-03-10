import React from 'react';
import {GroupBy} from "../model/GroupBy.ts";
import {MapOptions} from "../model/MapOptions.ts";

export interface Properties {
    stats: { [key: string]: number }[];
    setStats: (value: { [key: string]: number }[]) => void;

    groupBy: GroupBy;
    setGroupBy: (value: GroupBy) => void;

    mapOptions: MapOptions;
    setMapOptions: (value: MapOptions) => void;
}

export const MapContext = React.createContext<Properties>({} as Properties);
