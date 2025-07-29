import React from "react";
import {Box} from "@mantine/core";
import ClusterMap from "./components/ClusterMap.tsx";

const ClusterMapView: React.FC = () => {

    return (
        <Box pos={"relative"}>
            <ClusterMap/>
        </Box>
    );
}

export default ClusterMapView;
