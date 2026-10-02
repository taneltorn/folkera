import React from "react";
import {Box} from "@mantine/core";
import {useStatsContext} from "../../../hooks/useStatsContext.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TuneStatsControls from "./components/TuneStatsControls.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import TuneStatsChart from "./components/TuneStatsChart.tsx";
import Loading from "../../../components/Loading.tsx";
import {useTranslation} from "react-i18next";

const StatsView: React.FC = () => {

    const {t} = useTranslation();

    const {groupBy, isLoading} = useStatsContext();
    const {addFilter} = useDataContext();
    const {setActiveView} = useActiveView();

    const handleClick = (label: string) => {
        addFilter({field: groupBy, value: label});
        setActiveView(View.TABLE);
    }

    return (
        <Box>
            <BottomControlBar>
                <TuneStatsControls/>
            </BottomControlBar>

            <Box px={"md"} pos={"relative"}>
                <Loading isLoading={isLoading} text={t("loading.data")}/>
                <TuneStatsChart onElementClick={handleClick}/>
            </Box>
        </Box>
    );
}

export default StatsView;
