import React, {useEffect} from "react";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TunesTableControls from "./components/TunesTableControls.tsx";
import TunesTable from "./components/TunesTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Box} from "@mantine/core";
import Loading from "../../../components/Loading.tsx";
import {TableColumnOrderContextProvider} from "../../../hooks/useTableColumnOrderContext.tsx";
import {useTranslation} from "react-i18next";

const TableView: React.FC = () => {

    const {t} = useTranslation();
    const {data, isLoading, loadData, loadFilteringOptions, pagination} = useDataContext();

    useEffect(() => {
        loadData();
    }, [pagination]);


    useEffect(() => {
        loadFilteringOptions();
    }, []);

    return (
        <Box pos={"relative"}>
            <Loading isLoading={isLoading} text={t("loading.data")}/>

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
