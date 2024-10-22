import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Group, Text} from "@mantine/core";
import {Trans} from "react-i18next";
import ViewSelection from "./ViewSelection.tsx";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import VisibleFieldSelector from "./VisibleFieldSelector.tsx";
import StatsTypeSelector from "./StatsTypeSelector.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import StatsChartTypeSelector from "./StatsChartTypeSelector.tsx";
import MapTypeSelector from "./MapTypeSelector.tsx";

const RecordingTableViewBar: React.FC = () => {

    const {filteredData} = useDataFiltering();
    const {activeView} = useActiveView();

    return (
        <Group px={"md"} my={"xs"} justify={"space-between"}>
            <Group>
                <Text size={"sm"}>
                    <Trans i18nKey="view.recordings.table.results" values={{count: filteredData.length}}/>
                </Text>

                <Group gap={4}>
                    {activeView === View.TABLE && <VisibleFieldSelector/>}
                    {activeView === View.STATS &&
                        <>
                            <StatsTypeSelector/>
                            <StatsChartTypeSelector/>
                        </>}

                    {activeView === View.MAP &&
                        <>
                            <MapTypeSelector/>
                        </>}
                </Group>
            </Group>

            <ViewSelection/>
        </Group>
    );
}

export default RecordingTableViewBar;
