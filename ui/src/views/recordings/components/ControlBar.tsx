import React, {ReactNode} from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {View} from "../../../context/ActiveViewContext.tsx";
import ActiveViewButton from "../../../components/ActiveViewButton.tsx";
import {FaTableList} from "react-icons/fa6";
import {Size} from "../../../utils/constants.ts";
import {FaMapMarkerAlt} from "react-icons/fa";
import {IoStatsChartSharp} from "react-icons/io5";
import LabelValue from "../../../components/LabelValue.tsx";

interface Properties {
    children?: ReactNode;
}

const ControlBar: React.FC<Properties> = ({children}) => {

    const {t} = useTranslation();
    const {totalItems} = useDataContext();

    return (
        <Group px={"md"} my={"md"} justify={"space-between"}>
            <Group>
                <LabelValue label={t("view.recordings.table.results")} value={totalItems}/>
                
                <Group gap={4}>
                    {children}
                </Group>
            </Group>

            <Group gap={4}>
                <ActiveViewButton view={View.TABLE} icon={<FaTableList size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.MAP} icon={<FaMapMarkerAlt size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.STATS} icon={<IoStatsChartSharp size={Size.icon.SM}/>}/>
            </Group>
        </Group>
    );
}

export default ControlBar;
