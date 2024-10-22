import React from "react";
import RecordingTable from "./table/RecordingTable.tsx";
import {Box, Divider} from "@mantine/core";
import RecordingTableControls from "./controls/RecordingTableControls.tsx";
import RecordingMap from "./map/RecordingMap.tsx";
import RecordingStats from "./stats/RecordingStats.tsx";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import RecordingTableViewBar from "./controls/RecordingTableViewBar.tsx";

const RecordingListContent: React.FC = () => {

    const {activeView} = useActiveView();

    return (
        <Box mb={75}>
            <RecordingTableControls/>
            <Divider my={"md"}/>
            <RecordingTableViewBar/>

            {activeView === View.TABLE && <RecordingTable/>}
            {activeView === View.MAP && <RecordingMap/>}
            {activeView === View.STATS && <RecordingStats/>}
        </Box>
    );
}

export default RecordingListContent;
