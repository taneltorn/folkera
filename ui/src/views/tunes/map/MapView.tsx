import React from "react";
import {Box} from "@mantine/core";
import BottomControlBar from "../components/BottomControlBar.tsx";
import TuneMap from "./components/TuneMap.tsx";
import TuneMapControls from "./components/TuneMapControls.tsx";

const MapView: React.FC = () => {

    return (
        <Box>
            <BottomControlBar>
                <TuneMapControls/>
            </BottomControlBar>

            <TuneMap/>
        </Box>
    );
}

export default MapView;
