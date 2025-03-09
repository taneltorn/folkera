import React from 'react';
import {GroupBy} from "../model/GroupBy.ts";

export interface Properties {
    stats: { [key: string]: number }[];
    setStats: (value: { [key: string]: number }[]) => void;

    groupBy: GroupBy;
    setGroupBy: (value: GroupBy) => void;
}

export const MapContext = React.createContext<Properties>({} as Properties);
