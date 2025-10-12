import React, {ReactNode} from "react";
import {Group} from "@mantine/core";
import {View} from "../../../context/ActiveViewContext.tsx";
import ActiveViewButton from "../../../components/buttons/ActiveViewButton.tsx";
import {FaTableList} from "react-icons/fa6";
import {Size} from "../../../utils/constants.ts";
import {FaMapMarkerAlt} from "react-icons/fa";
import {IoStatsChartSharp} from "react-icons/io5";
import {useControlState} from "../../../hooks/useControlState.tsx";
import {ControlState} from "../../../model/ControlState.ts";
import SaveModificationsButtons from "./controls/SaveModificationsButtons.tsx";
import BulkModifyRecordingsButtons from "./controls/BulkModifyRecordingsButtons.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";

interface Properties {
    children?: ReactNode;
}

const BottomControlBar: React.FC<Properties> = ({children}) => {

    const {currentUser} = useAuth();
    const {state} = useControlState();

    return (
        <Group px={"md"} py={"xs"} justify={"space-between"} mb={"md"} mt={"xs"}>
            {state === ControlState.IDLE
                ? children
                : <Group gap={4}>
                {currentUser?.isAdmin && <>
                    <SaveModificationsButtons/>
                    <BulkModifyRecordingsButtons/>
                </>}
                </Group>}

            <Group gap={4}>
                <ActiveViewButton view={View.TABLE} icon={<FaTableList size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.MAP} icon={<FaMapMarkerAlt size={Size.icon.SM}/>}/>
                <ActiveViewButton view={View.STATS} icon={<IoStatsChartSharp size={Size.icon.SM}/>}/>
            </Group>
        </Group>
    );
}

export default BottomControlBar;
