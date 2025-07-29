import React, {ReactNode} from "react";
import {Group} from "@mantine/core";
import {View} from "../../../context/ActiveViewContext.tsx";
import ActiveViewButton from "../../../components/buttons/ActiveViewButton.tsx";
import {FaTableList} from "react-icons/fa6";
import {Size} from "../../../utils/constants.ts";
import {FaMapMarkerAlt} from "react-icons/fa";
import {IoStatsChartSharp} from "react-icons/io5";
import { MdScatterPlot } from "react-icons/md";

interface Properties {
    children?: ReactNode;
}

const BottomControlBar: React.FC<Properties> = ({children}) => {

    return (
        <Group px={"md"} justify={"space-between"} mb={"md"} mt={"xs"}>
            <Group gap={"md"}>
                {children}
            </Group>

            <Group gap={4}>
                <ActiveViewButton view={View.TABLE} icon={<FaTableList size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.MAP} icon={<FaMapMarkerAlt size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.STATS} icon={<IoStatsChartSharp size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.CLUSTER} icon={<MdScatterPlot size={Size.icon.SM}/>}/>
            </Group>
        </Group>
    );
}

export default BottomControlBar;
