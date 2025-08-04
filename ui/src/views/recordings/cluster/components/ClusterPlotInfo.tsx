import React from "react";
import {useTranslation} from "react-i18next";
import {useClusterContext} from "../../../../hooks/useClusterContext.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {Group} from "@mantine/core";

const ClusterPlotInfo: React.FC = () => {

    const {t} = useTranslation();
    const {clusterPlot} = useClusterContext();

    return (
        <Group gap={"xl"}> 
            <LabelValue
                title={t("tooltip.data")}
                label={t("view.clusterMap.trainingData")}
                value={`${clusterPlot.perfs || "N/A"} (${clusterPlot.works || "N/A"})`}
            />

            {clusterPlot.testPerfs && clusterPlot.testWorks &&
                <LabelValue
                    title={t("tooltip.data")}
                    label={t("view.clusterMap.testData")}
                    value={`${clusterPlot.testPerfs} (${clusterPlot.testWorks})`}
                />}
                
            {clusterPlot.mAP &&
                <LabelValue
                    title={t("tooltip.map")}
                    label={t("view.clusterMap.precision")}
                    value={`${clusterPlot.mAP.toFixed(3)}`}
                />}
        </Group>
    );
};

export default ClusterPlotInfo;
