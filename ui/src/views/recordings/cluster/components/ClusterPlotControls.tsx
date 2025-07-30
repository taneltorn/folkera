import React from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {ClusterPlots, ColorSchemes} from "../../../../utils/lists.ts";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import BottomControlBar from "../../components/BottomControlBar.tsx";
import {FaRegEye} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useClusterContext} from "../../../../hooks/useClusterContext.tsx";
import {ClusterDataMode} from "../../../../model/ClusterDataMode.ts";

const ClusterPlotControls: React.FC = () => {

    const {t} = useTranslation();

    const {
        setColorScheme,
        clusterPlot,
        setClusterPlot,
        clusterDataMode,
        setClusterDataMode,
        activeWork,
        setActiveWork
    } = useClusterContext();


    const handleDataFileChange = (value: string) => {
        const plot = ClusterPlots.find(p => p.file === value);
        if (plot) {
            setClusterPlot(plot);
        }
    }

    const handleClusterDataModeChange = (value: ClusterDataMode) => {
        setClusterDataMode(value);
        setColorScheme(value === ClusterDataMode.TEST_ONLY
            ? ColorSchemes[0]
            : ColorSchemes[2]);
    }

    const handleReset = () => {
        setActiveWork(null);
    }

    return (
        <BottomControlBar>

            <LabelValue label={t("view.clusterMap.trainingData")}
                        value={`${clusterPlot.perfs} (${clusterPlot.works})`}/>

            <LabelValue label={t("view.clusterMap.testData")}
                        value={`${clusterPlot.testPerfs} (${clusterPlot.testWorks})`}/>

            <LabelValue label={t("view.clusterMap.precision")}
                        value={`${clusterPlot.mAP.toFixed(3)}`}/>

            <MenuSelect
                title={t(`view.clusterMap.modelVersion.title`)}
                label={`${clusterPlot.name} (${clusterPlot.version})`}
                options={ClusterPlots.map(plot => ({
                    value: plot.file,
                    label: `${plot.name} (${plot.version})`
                }))}
                onChange={(value) => handleDataFileChange(value)}
            />

            <MenuSelect
                title={t(`view.clusterMap.dataMode.title`)}
                label={t(`view.clusterMap.dataMode.${clusterDataMode}`)}
                options={[ClusterDataMode.ALL, ClusterDataMode.TEST_ONLY].map(mode => ({
                    value: mode,
                    label: t(`view.clusterMap.dataMode.${mode}`)
                }))}
                onChange={v => handleClusterDataModeChange(v as ClusterDataMode)}
            />

            {activeWork &&
                <Button variant={"subtle"} size={"sm"}
                        leftSection={<FaRegEye size={Size.icon.MD}/>}
                        onClick={handleReset}>
                    {t("button.showAll")}
                </Button>}

        </BottomControlBar>
    );
};

export default ClusterPlotControls;
