import React, {useEffect} from "react";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TunesTableControls from "./components/TunesTableControls.tsx";
import TunesTable from "./components/TunesTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import {TableColumnOrderContextProvider} from "../../../hooks/useTableColumnOrderContext.tsx";

const TableView: React.FC = () => {

    const {data, loadFilteringOptions} = useDataContext();

    useEffect(() => {
        loadFilteringOptions();
    }, []);

    return (
        <Box pos={"relative"}>
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
