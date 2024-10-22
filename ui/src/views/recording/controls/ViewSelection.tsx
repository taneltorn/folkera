import React from "react";
import {Group} from "@mantine/core";
import {FaMapMarkerAlt} from "react-icons/fa";
import {Size} from "../../../utils/common.constants.ts";
import {FaTableList} from "react-icons/fa6";
import {IoStatsChartSharp} from "react-icons/io5";
import ViewButton from "./ViewButton.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";

const ViewSelection: React.FC = () => {

    return (
        <Group gap={4}>
            <ViewButton view={View.TABLE} icon={<FaTableList size={Size.icon.SM}/>}/>
            <ViewButton view={View.MAP} icon={<FaMapMarkerAlt size={Size.icon.SM}/>}/>
            <ViewButton view={View.STATS} icon={<IoStatsChartSharp size={Size.icon.SM}/>}/>
        </Group>
    );
}

export default ViewSelection;
