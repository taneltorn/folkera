import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {StatsContext} from "../context/StatsContext.tsx";

import {GroupBy} from "../../../domain/GroupBy.ts";
import { ChartType } from '../model/ChartType.ts';

interface Properties {
    defaultGroupBy: GroupBy;
    children: React.ReactNode;
}

export const StatsContextProvider: React.FC<Properties> = ({defaultGroupBy, children}) => {

    const [stats, setStats] = useState<{ [key: string]: number }[]>([]);
    const [groupBy, setGroupBy] = useState<GroupBy>(defaultGroupBy);
    const [chartType, setChartType] = useState<ChartType>(ChartType.BAR);

    const groupsCount = useMemo<number>(() => Object.values(stats || []).filter(x => !!x).length, [stats]);

    const context = useMemo(() => ({
        stats, setStats,
        groupsCount,
        groupBy, setGroupBy,
        chartType, setChartType,
    }), [stats, groupBy, chartType]);

    return (
        <StatsContext.Provider value={context}>
            {children}
        </StatsContext.Provider>
    )
}

export const useStatsContext = () => {
    const context = useContext(StatsContext);
    if (isEmpty(context)) {
        throw new Error('useStatsContext must be used within a StatsContextProvider')
    }

    return context;
};
