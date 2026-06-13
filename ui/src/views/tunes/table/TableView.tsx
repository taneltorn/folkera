import React from "react";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TunesTableControls from "./components/TunesTableControls.tsx";
import TunesTable from "./components/TunesTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import Loading from "../../../components/Loading.tsx";
import {TableColumnOrderContextProvider} from "../../../hooks/useTableColumnOrderContext.tsx";

const TableView: React.FC = () => {

    const {data, isLoading} = useDataContext();

    return (
        <Box pos={"relative"}>
            <Loading isLoading={isLoading}/>

            <BottomControlBar>
                <TunesTableControls/>
            </BottomControlBar>

            <TableColumnOrderContextProvider>
                <TunesTable data={data}/>
            </TableColumnOrderContextProvider>
        </Box>
    );
}

export default TableView;
