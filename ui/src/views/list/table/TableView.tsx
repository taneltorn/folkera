import React from "react";
import ControlBar from "../components/ControlBar.tsx";
import RecordingTableControls from "./components/RecordingTableControls.tsx";
import RecordingTable from "./components/RecordingTable.tsx";
import {useDataContext} from "../../../hooks/useDataContext.tsx";

const TableView: React.FC = () => {

    const {data} = useDataContext();

    return (
        <>
            <ControlBar>
                <RecordingTableControls/>
            </ControlBar>

            <RecordingTable data={data}/>
        </>
    );
}

export default TableView;
