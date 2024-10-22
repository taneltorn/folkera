import React from 'react';
import {StatsOptions, GroupBy, ChartType} from "../model/Stats.ts";

export interface Properties {
    groupBy: GroupBy;
    setGroupBy: (value: GroupBy) => void;

    chartType: ChartType;
    setChartType: (value: ChartType) => void;

    options: StatsOptions;
    setOptions: (value: StatsOptions) => void;

}

export const StatsOptionsContext = React.createContext<Properties>({} as Properties);
