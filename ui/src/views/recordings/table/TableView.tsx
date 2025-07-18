import React from "react";
import BottomControlBar from "../components/BottomControlBar.tsx";
import RecordingTableControls from "./components/RecordingTableControls.tsx";
import RecordingTable from "./components/RecordingTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import Loading from "../../../components/Loading.tsx";

const TableView: React.FC = () => {

    const {data, isLoading} = useDataContext();

    return (
        <Box pos={"relative"}>
            <Loading isLoading={isLoading}/>
            <BottomControlBar>
                <RecordingTableControls/>
            </BottomControlBar>

            <RecordingTable data={data}/>
        </Box>
    );
}

export default TableView;
