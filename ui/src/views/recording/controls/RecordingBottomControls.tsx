import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import TableControls from "./components/TableControls.tsx";
import StatsControls from "./components/StatsControls.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import MapControls from "./components/MapControls.tsx";
import RecordingViewButton from "./components/RecordingViewButton.tsx";
import {FaTableList} from "react-icons/fa6";
import {Size} from "../../../utils/common.constants.ts";
import {FaMapMarkerAlt} from "react-icons/fa";
import {IoStatsChartSharp} from "react-icons/io5";
import LabelValue from "./components/LabelValue.tsx";

const RecordingBottomControls: React.FC = () => {

    const {t} = useTranslation();
    const {filteredData} = useDataFiltering();
    const {activeView} = useActiveView();

    return (
        <Group px={"md"} my={"md"} justify={"space-between"}>
            <Group>
                <LabelValue label={t("view.recordings.table.results")} value={filteredData.length}/>

                <Group gap={4}>
                    {activeView === View.TABLE && <TableControls/>}
                    {activeView === View.MAP && <MapControls/>}
                    {activeView === View.STATS && <StatsControls/>}
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
