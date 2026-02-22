import React from "react";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TunesTableControls from "./components/TunesTableControls.tsx";
import TunesTable from "./components/TunesTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import Loading from "../../../components/Loading.tsx";

const TableView: React.FC = () => {

    const {data, isLoading} = useDataContext();

    return (
        <Box pos={"relative"}>
            <Loading isLoading={isLoading}/>
            <BottomControlBar>
                <TunesTableControls/>
            </BottomControlBar>

            <TunesTable data={data}/>
        </Box>
    );
}

export default TableView;
