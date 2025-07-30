import React from "react";
import {useTranslation} from "react-i18next";
import {useClusterContext} from "../../../../hooks/useClusterContext.tsx";
import {Stack} from "@mantine/core";
import ClusterPlotInfoLabel from "./ClusterPlotInfoLabel.tsx";
import {ClusterDataMode} from "../../../../model/ClusterDataMode.ts";

const ClusterPlotInfo: React.FC = () => {

    const {t} = useTranslation();
    const {clusterPlot, clusterDataMode} = useClusterContext();

    const trainingWorks = clusterDataMode === ClusterDataMode.TEST_ONLY && clusterPlot.works && !isNaN(clusterPlot.works)
        ? (clusterPlot.works - clusterPlot.testWorks)
        : clusterPlot.works || "?";

    const trainingPerfs = clusterDataMode === ClusterDataMode.TEST_ONLY && clusterPlot.perfs && !isNaN(clusterPlot.perfs)
        ? (clusterPlot.perfs - clusterPlot.testPerfs)
        : clusterPlot.perfs || "?";

    return (
        <Stack gap={"md"} mb={"md"} visibleFrom={"lg"}>
            <ClusterPlotInfoLabel
                label={t("view.clusterMap.dataset")}
                value={clusterPlot.name}
            />
            <ClusterPlotInfoLabel
                label={t("view.clusterMap.version")}
                value={clusterPlot.version}
            />
            <ClusterPlotInfoLabel
                label={t("view.clusterMap.trainingData")}
                value={`${trainingPerfs} (${trainingWorks})`}
            />

            {clusterDataMode === ClusterDataMode.TEST_ONLY && <>
                <ClusterPlotInfoLabel
                    label={t("view.clusterMap.testData")}
                    value={`${clusterPlot.testPerfs} (${clusterPlot.testWorks})`}
                />
                <ClusterPlotInfoLabel
                    label={t("view.clusterMap.precision")}
                    value={`${clusterPlot.mAP.toFixed(3)}`}

                />
            </>}
        </Stack>
    );
};

export default ClusterPlotInfo;
