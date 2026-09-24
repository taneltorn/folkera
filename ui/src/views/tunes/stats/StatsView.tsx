import React, {useEffect} from "react";
import {useStatsService} from "../../../hooks/useStatsService.ts";
import {Box} from "@mantine/core";
import {useStatsContext} from "../../../hooks/useStatsContext.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TuneStatsControls from "./components/TuneStatsControls.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import TuneStatsChart from "./components/TuneStatsChart.tsx";
import Loading from "../../../components/Loading.tsx";

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
            <Loading isLoading={isLoading}/>

            <BottomControlBar>
                <TuneStatsControls/>
            </BottomControlBar>

            <Box px={"md"}>
                <TuneStatsChart onElementClick={handleClick}/>
            </Box>
        </Box>
    );
}

export default StatsView;
