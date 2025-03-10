import React, {useEffect} from "react";
import {useStatsService} from "../../../services/useStatsService.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box, LoadingOverlay} from "@mantine/core";
import ControlBar from "../components/ControlBar.tsx";
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
        <>
            <LoadingOverlay visible={isLoading}/>
            <ControlBar>
                <RecordingMapControls/>
            </ControlBar>

            <Box px={"md"} h={800}>
                <RecordingMap/>
            </Box>
        </>
    );
}

export default MapView;
