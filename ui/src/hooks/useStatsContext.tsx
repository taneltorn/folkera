import React, {useContext, useMemo, useState} from 'react';
import {generateFileName, isEmpty} from "../utils/helpers.tsx";
import {StatsContext} from "../context/StatsContext.tsx";
import {GroupBy} from "../model/GroupBy.ts";
import {ChartType} from '../model/ChartType.ts';
import useLocalStorage from "./useLocalStorage.tsx";
import {useTranslation} from "react-i18next";
import {Filter} from "../model/Filter.ts";
import {useDataExport} from "./useDataExport.tsx";

interface Properties {
    children: React.ReactNode;
}

export const StatsContextProvider: React.FC<Properties> = ({children}) => {

    const {t} = useTranslation();
    const {exportCsv} = useDataExport();

    const [stats, setStats] = useState<{ [key: string]: number }[]>([]);
    const [chartType, setChartType] = useLocalStorage<ChartType>("stats.chartType", ChartType.BAR);
    const [groupBy, setGroupBy] = useLocalStorage<GroupBy>("stats.groupBy", GroupBy.YEAR);

    const groupsCount = useMemo<number>(() => Object.values(stats || []).filter(x => !!x).length, [stats]);

    const exportStats = (filters?: Filter[]) => {
        const filename = generateFileName(t(`view.recordings.stats.groupBy.${groupBy}`), filters);

        const transformedData = Object.entries(stats).map(([key, value]) => ({
            [t(`recording.${groupBy}`)]: key,
            [t("export.count")]: value,
        }));
        
        exportCsv(filename, transformedData);
    };

    const context = useMemo(() => ({
        stats, setStats,
        groupsCount,
        groupBy, setGroupBy,
        chartType, setChartType,
        exportStats

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
