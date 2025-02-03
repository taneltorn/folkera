import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Group, Text} from "@mantine/core";
import {Trans} from "react-i18next";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import TableVisibleFieldSelector from "./components/TableVisibleFieldSelector.tsx";
import StatsGroupBySelector from "./components/StatsGroupBySelector.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import StatsChartTypeSelector from "./components/StatsChartTypeSelector.tsx";
import MapTypeSelector from "./components/MapTypeSelector.tsx";
import RecordingViewButton from "./components/RecordingViewButton.tsx";
import {FaTableList} from "react-icons/fa6";
import {Size} from "../../../utils/common.constants.ts";
import {FaMapMarkerAlt} from "react-icons/fa";
import {IoStatsChartSharp} from "react-icons/io5";

const RecordingBottomControls: React.FC = () => {

    const {filteredData} = useDataFiltering();
    const {activeView} = useActiveView();

    return (
        <Group px={"md"} my={"xs"} justify={"space-between"}>
            <Group>
                <Text size={"sm"}>
                    <Trans i18nKey="view.recordings.table.results" values={{count: filteredData.length}}/>
                </Text>

                <Group gap={4}>
                    {activeView === View.TABLE && <TableVisibleFieldSelector/>}
                    {activeView === View.STATS &&
                        <>
                            <StatsGroupBySelector/>
                            <StatsChartTypeSelector/>
                        </>}
                    {activeView === View.MAP && <MapTypeSelector/>}
                </Group>
            </Group>

            <Group gap={4}>
                <RecordingViewButton view={View.TABLE} icon={<FaTableList size={Size.icon.SM}/>}/>
                <RecordingViewButton view={View.MAP} icon={<FaMapMarkerAlt size={Size.icon.SM}/>}/>
                <RecordingViewButton view={View.STATS} icon={<IoStatsChartSharp size={Size.icon.SM}/>}/>
            </Group>
        </Group>
    );
}

export default RecordingBottomControls;
