import React from "react";
import ClusterPlot from "./components/ClusterPlot.tsx";
import {ClusterContextProvider} from "../../../hooks/useClusterContext.tsx";
import ClusterPlotControls from "./components/ClusterPlotControls.tsx";
import ClusterPlotInfo from "./components/ClusterPlotInfo.tsx";
import {Group} from "@mantine/core";

const ClusterPlotView: React.FC = () => {

    return (
        <ClusterContextProvider>

            <Group px={"md"} justify={"space-between"} mb={"md"} mt={"xs"}>
                    <ClusterPlotControls/>
                    <ClusterPlotInfo/>
            </Group>

            <Group justify={"space-between"} wrap={"nowrap"} align={"start"}>
                <ClusterPlot/>
            </Group>
        </ClusterContextProvider>
    );
}

export default ClusterPlotView;
