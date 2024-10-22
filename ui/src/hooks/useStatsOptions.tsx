import React, {useContext, useMemo, useState} from 'react';
import {isEmpty, range} from "../utils/common.helpers.tsx";
import {StatsOptionsContext} from "../context/StatsOptionsContext.tsx";
import {StatsOptions, GroupBy, ChartType} from "../model/Stats.ts";
import {ParishGroups} from "../utils/common.lists.ts";

interface Properties {
    children: React.ReactNode;
}

const StatsTypeToStatsOptions: Map<GroupBy, StatsOptions> = new Map<GroupBy, StatsOptions>([
    [GroupBy.GROUP_BY_YEAR, {
        groupBy: "year",
        groups: range(1912, 1999).map(n => `${n}`)
    }],
    [GroupBy.GROUP_BY_INSTRUMENT, {groupBy: "instrument", transformers: ["splitByComma"] }],
    [GroupBy.GROUP_BY_PARISH, {groupBy: "location", transformers: ["splitByComma", "cutFromLessThanSign"], groups: ParishGroups }],
    [GroupBy.GROUP_BY_PIECE, {groupBy: "piece"}],
]);

export const StatsOptionsContextProvider: React.FC<Properties> = ({children}) => {

    const [groupBy, setGroupBy] = useState<GroupBy>(GroupBy.GROUP_BY_YEAR);
    const [chartType, setChartType] = useState<ChartType>(ChartType.BAR);
    const [options, setOptions] = useState<StatsOptions>(StatsTypeToStatsOptions.get(GroupBy.GROUP_BY_YEAR)!);

    const handleGroupByChange = (groupBy: GroupBy) => {
        setGroupBy(groupBy);
        setOptions(StatsTypeToStatsOptions.get(groupBy)!);
    }

    const context = useMemo(() => ({
        groupBy, setGroupBy: handleGroupByChange,
        chartType, setChartType,
        options, setOptions,
    }), [groupBy, chartType]);

    return (
        <StatsOptionsContext.Provider value={context}>
            {children}
        </StatsOptionsContext.Provider>
    )
}

export const useStatsOptions = () => {
    const context = useContext(StatsOptionsContext);
    if (isEmpty(context)) {
        throw new Error('useStatsOptions must be used within a StatsOptionsContextProvider')
    }

    return context;
};
