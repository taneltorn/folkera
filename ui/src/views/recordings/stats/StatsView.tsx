import React, {useEffect} from "react";
import {useStatsService} from "../../../services/useStatsService.tsx";
import {Box, LoadingOverlay} from "@mantine/core";
import {useStatsContext} from "../../../hooks/useStatsContext.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import ControlBar from "../components/ControlBar.tsx";
import RecordingStatsControls from "./components/RecordingStatsControls.tsx";
import RecordingStats from "./components/RecordingStats.tsx";

interface Properties {
}

const StatsView: React.FC<Properties> = () => {

    const {groupBy, setStats} = useStatsContext();
    const {fetchStats, isLoading} = useStatsService();
    const {filters} = useDataContext();

    useEffect(() => {
        fetchStats(filters, groupBy).then(r => setStats(r));
    }, [filters, groupBy]);

    return (
        <Box pos={"relative"}>
            <LoadingOverlay visible={isLoading}/>
            
            <ControlBar>
                <RecordingStatsControls/>
            </ControlBar>
            
            <Box px={"md"} h={800}>
                <RecordingStats/>
            </Box>
        </Box>
    );
}

export default StatsView;
