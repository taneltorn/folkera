import React from "react";
import {useDataFiltering} from "../../hooks/useDataFiltering.tsx";
import RecordingTable from "./table/RecordingTable.tsx";
import {Box, Divider} from "@mantine/core";
import RecordingTableControls from "./table/RecordingTableControls.tsx";
import RecordingTableFiltersBar from "./table/RecordingTableFiltersBar.tsx";
import {View} from "../../context/DataFilteringContext.tsx";
import RecordingMap from "./map/RecordingMap.tsx";
import RecordingStats from "./map/RecordingStats.tsx";

const RecordingListContent: React.FC = () => {

    const {view, filteredData} = useDataFiltering();

    return (
        <Box mb={75}>
            <RecordingTableControls/>
            <Divider my={"md"}/>

            <RecordingTableFiltersBar/>

            {view === View.TABLE && <RecordingTable data={filteredData}/>}
            {view === View.MAP && <RecordingMap data={filteredData}/>}
            {view === View.STATS && <RecordingStats data={filteredData}/>}

        </Box>
    );
}

export default RecordingListContent;
