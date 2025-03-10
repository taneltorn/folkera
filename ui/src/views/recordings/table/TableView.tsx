import React from "react";
import ControlBar from "../components/ControlBar.tsx";
import RecordingTableControls from "./components/RecordingTableControls.tsx";
import RecordingTable from "./components/RecordingTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box, LoadingOverlay} from "@mantine/core";

const TableView: React.FC = () => {

    const {data, isLoading} = useDataContext();

    return (
        <Box pos={"relative"}>
            <LoadingOverlay visible={isLoading}/>
            <ControlBar>
                <RecordingTableControls/>
            </ControlBar>

            <RecordingTable data={data}/>
        </Box>
    );
}

export default TableView;
