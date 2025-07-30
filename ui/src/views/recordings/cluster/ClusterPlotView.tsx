import React from "react";
import ClusterPlot from "./components/ClusterPlot.tsx";
import {ClusterContextProvider} from "../../../hooks/useClusterContext.tsx";

const ClusterPlotView: React.FC = () => {

    return (
        <ClusterContextProvider>
            <ClusterPlot/>
        </ClusterContextProvider>
    );
}

export default ClusterPlotView;
