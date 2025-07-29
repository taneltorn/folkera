import React from "react";
import BottomControlBar from "../components/BottomControlBar.tsx";
import RecordingsTableControls from "./components/RecordingsTableControls.tsx";
import RecordingsTable from "./components/RecordingsTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import Loading from "../../../components/Loading.tsx";

const TableView: React.FC = () => {

    const {data, isLoading} = useDataContext();

    return (
        <Box pos={"relative"}>
            <Loading isLoading={isLoading}/>
            <BottomControlBar>
                <RecordingsTableControls/>
            </BottomControlBar>

            <RecordingsTable data={data}/>
        </Box>
    );
}

export default TableView;
