import React from "react";
import {Button, Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {ClusterPlots} from "../../../../utils/lists.ts";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {FaRegEye} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useClusterContext} from "../../../../hooks/useClusterContext.tsx";

const ClusterPlotControls: React.FC = () => {

    const {t} = useTranslation();

    const {
        clusterPlot,
        setClusterPlot,
        activeWork,
        setActiveWork
    } = useClusterContext();

    const handleDataFileChange = (value: string) => {
        const plot = ClusterPlots.find(p => p.file === value);
        if (plot) {
            setClusterPlot(plot);
        }
    }

    const handleReset = () => {
        setActiveWork(null);
    }

    return (
        <Group gap={"md"}>
            <MenuSelect
                title={t(`view.clusterMap.modelVersion.title`)}
                label={`${clusterPlot.name} (${clusterPlot.version})`}
                options={ClusterPlots.map(plot => ({
                    value: plot.file,
                    label: `${plot.name} (${plot.version})`
                }))}
                onChange={(value) => handleDataFileChange(value)}
            />

            {activeWork &&
                <Button variant={"subtle"} size={"sm"}
                        leftSection={<FaRegEye size={Size.icon.SM}/>}
                        onClick={handleReset}>
                    {t("button.showAll")}
                </Button>}
        </Group>
    );
};

export default ClusterPlotControls;
