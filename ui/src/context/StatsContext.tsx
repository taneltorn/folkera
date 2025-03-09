import React from 'react';
import {GroupBy} from "../model/GroupBy.ts";
import { ChartType } from '../model/ChartType.ts';

export interface Properties {
    stats: { [key: string]: number }[];
    setStats: (value: { [key: string]: number }[]) => void;

    groupsCount: number;
    
    groupBy: GroupBy;
    setGroupBy: (value: GroupBy) => void;

    chartType: ChartType;
    setChartType: (value: ChartType) => void;
}

export const StatsContext = React.createContext<Properties>({} as Properties);
