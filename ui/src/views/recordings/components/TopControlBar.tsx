import React from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Button, Group} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import RecordingSearch from "./RecordingSearch.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {RxCheck} from "react-icons/rx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";
import RecordingFilters from "./RecordingFilters.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useRecordingSelection} from "../../../hooks/useRecordingSelection.tsx";
import {TbCheckbox} from "react-icons/tb";
import BulkModifyRecordingsButton from "./BulkModifyRecordingsButton.tsx";

const TopControlBar: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {isActive, setIsActive, clearSelection} = useRecordingSelection();
    const {exportData} = useDataContext();
    const {modifications, clearModifications} = useModifications();
    const {saveData, loadData} = useDataContext();
    const {notify} = useNotifications();

    const handleSave = () => {
        saveData(modifications);
        clearModifications();
        notify(t("toast.success.saveData"), NotificationType.SUCCESS);
    };

    const handleClear = () => {
        loadData();
        clearModifications();
    };

    const handleSelectionCancel = () => {
        clearSelection();
        setIsActive(false);
    };

    return (<>
            <Group justify={"space-between"} mb={"md"}>
                <RecordingSearch/>

                <Group gap={4}>
                    {modifications.length > 0 && currentUser?.isAdmin
                        ? <>
                            <Button
                                variant={"subtle"}
                                size={"sm"}
                                color={"dark"}
                                onClick={handleClear}>
                                {t("view.recordings.controls.clear")}
                            </Button>
                            <Button
                                variant={"filled"}
                                size={"sm"}
                                color={"green"}
                                leftSection={<RxCheck size={Size.icon.MD}/>}
                                onClick={handleSave}>
                                {t("view.recordings.controls.save")}
                            </Button>
                        </>
                        : <>
                            {isActive
                                ? <>
                                    <Button
                                        variant={"subtle"}
                                        size={"sm"}
                                        color={"dark"}
                                        onClick={handleSelectionCancel}>
                                        {t("button.cancel")}
                                    </Button>
                                    <BulkModifyRecordingsButton/>
                                </>
                                : <>
                                    {currentUser?.isAdmin && <Button
                                        variant={"subtle"}
                                        size={"sm"}
                                        color={"dark"}
                                        disabled={modifications.length > 0}
                                        leftSection={<TbCheckbox size={Size.icon.MD}/>}
                                        onClick={() => setIsActive(true)} px={"xs"} mx={0}>
                                        {t("view.recordings.controls.selection")}
                                    </Button>}
                                    <Button
                                        variant={"subtle"}
                                        size={"sm"}
                                        color={"dark"}
                                        leftSection={<FaFileExport size={Size.icon.SM}/>}
                                        onClick={exportData} px={"xs"} mx={0}>
                                        {t("view.recordings.controls.export")}
                                    </Button>
                                </>}
                        </>}


                </Group>
            </Group>

            <RecordingFilters/>
        </>
    );
}

export default TopControlBar;
