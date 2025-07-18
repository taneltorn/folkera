import React, {useEffect} from "react";
import {useStatsService} from "../../../services/useStatsService.ts";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box, LoadingOverlay} from "@mantine/core";
import BottomControlBar from "../components/BottomControlBar.tsx";
import RecordingMap from "./components/RecordingMap.tsx";
import RecordingMapControls from "./components/RecordingMapControls.tsx";
import {useMapContext} from "../../../hooks/useMapContext.tsx";

const MapView: React.FC = () => {

    const {setStats, groupBy} = useMapContext();
    const {fetchStats, isLoading} = useStatsService();
    const {filters} = useDataContext();

    useEffect(() => {
        fetchStats(filters, groupBy).then(r => setStats(r));
    }, [filters, groupBy]);

    return (
        <Box pos={"relative"}>
            <LoadingOverlay visible={isLoading}/>
            <BottomControlBar>
                <RecordingMapControls/>
            </BottomControlBar>

            <Box px={"md"}>
                <RecordingMap/>
            </Box>
        </Box>
    );
}

export default MapView;
