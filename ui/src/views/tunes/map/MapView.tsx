import React from "react";
import {useStatsService} from "../../../hooks/useStatsService.ts";
import {Box} from "@mantine/core";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TuneMap from "./components/TuneMap.tsx";
import TuneMapControls from "./components/TuneMapControls.tsx";
import Loading from "../../../components/Loading.tsx";
import {useTranslation} from "react-i18next";

const MapView: React.FC = () => {

    const {t} = useTranslation();

    const {isLoading} = useStatsService();

    return (
        <Box>
            <BottomControlBar>
                <TuneMapControls/>
            </BottomControlBar>

            <Box px={"md"} pos={"relative"}>
                <Loading isLoading={isLoading} text={t("loading.data")}/>
                <TuneMap/>
            </Box>
        </Box>
    );
}

export default MapView;
