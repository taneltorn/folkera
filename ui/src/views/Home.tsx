import React from "react";
import RecordingList from "./recording/RecordingList.tsx";
import {DataFilteringContextProvider} from "../hooks/useDataFiltering.tsx";

const Home: React.FC = () => {

    return (
        <DataFilteringContextProvider>
            <RecordingList/>
        </DataFilteringContextProvider>
    );
}

export default Home;
