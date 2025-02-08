import React, {useEffect} from "react";
import {useStatsService} from "../../../hooks/useStatsService.tsx";
import {isEmpty} from "../../../utils/common.helpers.tsx";
import {Box} from "@mantine/core";
import {useStats} from "../../../hooks/useStats.tsx";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import Chart from "../../../components/Chart.tsx";

interface Properties {
}

const RecordingStats: React.FC<Properties> = () => {

    const {setStats, options} = useStats();
    const {fetchStats} = useStatsService();
    const {filteredData, addFilter} = useDataFiltering();
    const {setActiveView} = useActiveView();

    const handleClick = (label: string) => {
        addFilter(options.groupBy, [label]);
        setActiveView(View.TABLE);
    }

    useEffect(() => {
        if (isEmpty(filteredData)) {
            return;
        }
        fetchStats(filteredData, options).then(r => setStats(r));
    }, [filteredData, options]);

    return (
        <Box px={"md"} h={800}>
            <Chart onElementClick={handleClick}/>
        </Box>
    );
}

export default RecordingStats;
