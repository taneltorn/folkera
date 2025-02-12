import React, {useEffect} from "react";
import {useStatsService} from "../../../services/useStatsService.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import ControlBar from "../components/ControlBar.tsx";
import RecordingMap from "./components/RecordingMap.tsx";
import RecordingMapControls from "./components/RecordingMapControls.tsx";
import {useStatsContext} from "../../../hooks/useStatsContext.tsx";

const MapView: React.FC = () => {

    const {setStats, groupBy} = useStatsContext();
    const {fetchStats} = useStatsService();
    const {filters} = useDataContext();

    useEffect(() => {
        fetchStats(filters, groupBy).then(r => setStats(r));
    }, [filters, groupBy]);

    return (
        <>
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
