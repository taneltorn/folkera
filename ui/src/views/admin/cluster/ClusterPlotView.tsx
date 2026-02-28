import React from "react";
import ClusterPlot from "./components/ClusterPlot.tsx";
import {ClusterContextProvider} from "../../../hooks/useClusterContext.tsx";
import ClusterPlotControls from "./components/ClusterPlotControls.tsx";
import ClusterPlotInfo from "./components/ClusterPlotInfo.tsx";
import {Box, Group} from "@mantine/core";

interface Properties {
    showControls?: boolean;
    needle?: string;
}

const ClusterPlotView: React.FC<Properties> = ({showControls, needle}) => {

    return (
        <ClusterContextProvider>
            <Box pos={"relative"}>

                {showControls &&
                    <Group px={"md"} justify={"space-between"} mb={"md"} mt={"xs"}>
                        <ClusterPlotInfo/>
                        <ClusterPlotControls/>
                    </Group>}

                <ClusterPlot needle={needle}/>
            </Box>
        </ClusterContextProvider>
    );
}

export default ClusterPlotView;
