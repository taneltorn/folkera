import React, {useEffect} from "react";
import {useStatsService} from "../../../services/useStatsService.ts";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box, LoadingOverlay} from "@mantine/core";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TuneMap from "./components/TuneMap.tsx";
import TuneMapControls from "./components/TuneMapControls.tsx";
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
                <TuneMapControls/>
            </BottomControlBar>

            <Box px={"md"}>
                <TuneMap/>
            </Box>
        </Box>
    );
}

export default MapView;
