import React, {useEffect, useState} from "react";
import {useStatsService} from "../../../hooks/useStatsService.tsx";
import {isEmpty} from "../../../utils/common.helpers.tsx";
import {Box, Text} from "@mantine/core";
import {useStatsOptions} from "../../../hooks/useStatsOptions.tsx";
import {StatsItem} from "../../../model/Stats.ts";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import Chart from "../../../components/Chart.tsx";
import RecordingTableFiltersBar from "../controls/RecordingTableFiltersBar.tsx";

interface Properties {
}

const RecordingStats: React.FC<Properties> = () => {

    const {chartType, options} = useStatsOptions();
    const {fetchStats} = useStatsService();
    const {filteredData, addFilter} = useDataFiltering();
    const {setActiveView} = useActiveView();

    const [stats, setStats] = useState<StatsItem[]>([]);

    const handleClick = (label: string) => {
        addFilter(options.groupBy, [label]);
        setActiveView(View.TABLE);
    }

    useEffect(() => {
        if (isEmpty(filteredData)) {
            return;
        }
        fetchStats(filteredData, options)
            .then(r => {
                console.log(r)
                return r
            })
            .then(r => setStats(r));
    }, [filteredData, options]);

    return (
        <Box px={"md"} h={700}>
            <RecordingTableFiltersBar/>
            <Chart data={stats} chartType={chartType} onElementClick={handleClick}/>
        </Box>
    );
}

export default RecordingStats;
