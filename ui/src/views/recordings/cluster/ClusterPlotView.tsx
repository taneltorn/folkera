import React from "react";
import ClusterPlot from "./components/ClusterPlot.tsx";
import {ClusterContextProvider} from "../../../hooks/useClusterContext.tsx";
import ClusterPlotControls from "./components/ClusterPlotControls.tsx";
import ClusterPlotInfo from "./components/ClusterPlotInfo.tsx";
import {Group, Stack} from "@mantine/core";

const ClusterPlotView: React.FC = () => {

    return (
        <ClusterContextProvider>
            <ClusterPlotControls/>

            <Group justify={"space-between"} wrap={"nowrap"} align={"start"}>
                <Group wrap={"nowrap"}>
                    <Stack px={"md"}>
                        <ClusterPlotInfo/>
                    </Stack>
                </Group>
                <Group display={"flex"} w={"100%"}>
                    <ClusterPlot/>
                </Group>
            </Group>
        </ClusterContextProvider>
    );
}

export default ClusterPlotView;
