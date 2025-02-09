import React, {useContext, useMemo, useState} from 'react';
import {isEmpty, range} from "../utils/common.helpers.tsx";
import {StatsOptionsContext} from "../context/StatsOptionsContext.tsx";
import {StatsOptions, GroupBy, ChartType, StatsItem} from "../model/Stats.ts";
import {Parishes} from "../../../domain/common.lists.ts";

interface Properties {
    children: React.ReactNode;
}

const StatsTypeToStatsOptions: Map<GroupBy, StatsOptions> = new Map<GroupBy, StatsOptions>([
    [GroupBy.GROUP_BY_YEAR, {
        groupBy: "year",
        groups: range(1912, 1999).map(n => `${n}`)
    }],
    [GroupBy.GROUP_BY_INSTRUMENT, {groupBy: "instrument", transformers: ["splitByComma"]}],
    [GroupBy.GROUP_BY_PARISH, {
        groupBy: "parish",
        transformers: ["splitByComma"],
        groups: Parishes
    }],
    [GroupBy.GROUP_BY_TUNE, {groupBy: "tune", sort: "count"}],
]);

const DefaultGroupBy = GroupBy.GROUP_BY_YEAR;

export const StatsOptionsContextProvider: React.FC<Properties> = ({children}) => {

    const [stats, setStats] = useState<StatsItem[]>([]);
    const [groupBy, setGroupBy] = useState<GroupBy>(DefaultGroupBy);
    const [chartType, setChartType] = useState<ChartType>(ChartType.BAR);
    const [options, setOptions] = useState<StatsOptions>(StatsTypeToStatsOptions.get(DefaultGroupBy)!);

    const handleGroupByChange = (groupBy: GroupBy) => {
        setGroupBy(groupBy);
        setOptions(StatsTypeToStatsOptions.get(groupBy)!);
    }

    const groupsCount = useMemo<number>(() => Object.values(stats || []).filter(x => !!x).length, [stats]);

    const context = useMemo(() => ({
        stats, setStats,
        groupsCount,
        groupBy, setGroupBy: handleGroupByChange,
        chartType, setChartType,
        options, setOptions,
    }), [stats, groupBy, chartType]);

    return (
        <StatsOptionsContext.Provider value={context}>
            {children}
        </StatsOptionsContext.Provider>
    )
}

export const useStats = () => {
    const context = useContext(StatsOptionsContext);
    if (isEmpty(context)) {
        throw new Error('useStatsOptions must be used within a StatsOptionsContextProvider')
    }

    return context;
};
