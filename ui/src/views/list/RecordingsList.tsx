import React from "react";
import {DataContextProvider} from "../../hooks/useDataContext.tsx";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {Box} from "@mantine/core";
import TopBar from "./components/TopBar.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import TableView from "./table/TableView.tsx";
import MapView from "./map/MapView.tsx";
import StatsView from "./stats/StatsView.tsx";
import {StatsContextProvider} from "../../hooks/useStatsContext.tsx";

import {GroupBy} from "../../../../domain/GroupBy.ts";

const RecordingsList: React.FC = () => {

    const {activeView} = useActiveView();

    return (
        <DataContextProvider>
            <Box mb={75}>
                <TopBar/>

                {activeView === View.TABLE && <TableView/>}

                {activeView === View.MAP &&
                    <StatsContextProvider defaultGroupBy={GroupBy.PARISH}>
                        <MapView/>
                    </StatsContextProvider>}

                {activeView === View.STATS &&
                    <StatsContextProvider defaultGroupBy={GroupBy.YEAR}>
                        <StatsView/>
                    </StatsContextProvider>}
            </Box>

        </DataContextProvider>
    );
}

export default RecordingsList;
