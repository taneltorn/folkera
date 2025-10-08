import React, {useEffect} from "react";
import {useStatsService} from "../../../services/useStatsService.ts";
import {Box, LoadingOverlay} from "@mantine/core";
import {useStatsContext} from "../../../hooks/useStatsContext.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import BottomControlBar from "../components/BottomControlBar.tsx";
import RecordingStatsControls from "./components/RecordingStatsControls.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import RecordingStatsChart from "./components/RecordingStatsChart.tsx";

const StatsView: React.FC = () => {

    const {groupBy, setStats} = useStatsContext();
    const {fetchStats, isLoading} = useStatsService();
    const {filters, addFilter} = useDataContext();
    const {setActiveView} = useActiveView();

    const handleClick = (label: string) => {
        addFilter({field: groupBy, value: label});
        setActiveView(View.TABLE);
    }

    useEffect(() => {
        fetchStats(filters, groupBy)
            .then(r => setStats(r));
    }, [filters, groupBy]);

    return (
        <Box pos={"relative"}>
            <LoadingOverlay visible={isLoading}/>

            <BottomControlBar>
                <RecordingStatsControls/>
            </BottomControlBar>

            <Box px={"md"}>
                <RecordingStatsChart onElementClick={handleClick}/>
            </Box>
        </Box>
    );
}

export default StatsView;
