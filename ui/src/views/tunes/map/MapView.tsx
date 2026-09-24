import React, {useEffect} from "react";
import {useStatsService} from "../../../hooks/useStatsService.ts";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TuneMap from "./components/TuneMap.tsx";
import TuneMapControls from "./components/TuneMapControls.tsx";
import {useMapContext} from "../../../hooks/useMapContext.tsx";
import Loading from "../../../components/Loading.tsx";

const MapView: React.FC = () => {

    const {setStats, groupBy} = useMapContext();
    const {fetchStats, isLoading} = useStatsService();
    const {filters} = useDataContext();

    useEffect(() => {
        fetchStats(filters, groupBy).then(r => setStats(r));
    }, [filters, groupBy]);

    return (
        <Box>
            <BottomControlBar>
                <TuneMapControls/>
            </BottomControlBar>

            <Box px={"md"} pos={"relative"}>
                <Loading isLoading={isLoading}/>
                <TuneMap/>
            </Box>
        </Box>
    );
}

export default MapView;
