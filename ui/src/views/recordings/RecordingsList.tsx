import React, {useEffect} from "react";
import {useDataContext} from "../../hooks/useDataContext.tsx";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import TopBar from "./components/TopBar.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import TableView from "./table/TableView.tsx";
import MapView from "./map/MapView.tsx";
import StatsView from "./stats/StatsView.tsx";
import {StatsContextProvider} from "../../hooks/useStatsContext.tsx";
import {useLocation} from "react-router-dom";
import {MapContextProvider} from "../../hooks/useMapContext.tsx";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {Box} from "@mantine/core";

const RecordingsList: React.FC = () => {

    const {t} = useTranslation();
    const {activeView} = useActiveView();
    const {setFilters} = useDataContext();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.filters) {
            setFilters(location.state.filters)
        }
    }, [location.state]);

    return (
        <Page title={t("page.title.recordings")}>
            <Box px={"md"}>
                <TopBar/>
            </Box>

            {activeView === View.TABLE && <TableView/>}

            {activeView === View.MAP &&
                <MapContextProvider>
                    <MapView/>
                </MapContextProvider>}

            {activeView === View.STATS &&
                <StatsContextProvider>
                    <StatsView/>
                </StatsContextProvider>}
        </Page>
    );
}

export default RecordingsList;
