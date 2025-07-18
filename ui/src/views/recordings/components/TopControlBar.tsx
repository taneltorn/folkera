import React from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Button, Group} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import RecordingSearch from "./RecordingSearch.tsx";
import RecordingFilters from "./RecordingFilters.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {RxCheck, RxCross2} from "react-icons/rx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";

const TopControlBar: React.FC = () => {

    const {t} = useTranslation();
    const {filters, clearFilters, exportData} = useDataContext();
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

    return (<>
            <Group justify={"space-between"}>
                <RecordingSearch/>

                <Group gap={4}>
                    {modifications.length > 0 && <>
                        <Button
                            variant={"filled"}
                            size={"sm"}
                            color={"green"}
                            leftSection={<RxCheck size={Size.icon.MD}/>}
                            onClick={handleSave}>
                            {t("view.recordings.controls.save")}
                        </Button>
                        <Button
                            variant={"subtle"}
                            size={"sm"}
                            color={"red"}
                            leftSection={<RxCross2 size={Size.icon.MD}/>}
                            onClick={handleClear}>
                            {t("view.recordings.controls.clear")}
                        </Button>
                    </>}

                    {!!filters.length &&
                        <Button
                            visibleFrom={"sm"}
                            variant={"subtle"}
                            size={"sm"}
                            color={"dark"}
                            leftSection={<LuFilterX size={Size.icon.SM}/>}
                            onClick={clearFilters}>
                            {t("view.recordings.controls.clearFilters")}
                        </Button>}

                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        leftSection={<FaFileExport size={Size.icon.SM}/>}
                        onClick={exportData} px={"xs"} mx={0}>
                        {t("view.recordings.controls.export")}
                    </Button>
                </Group>
            </Group>

            <Group mt={"sm"} gap={4}>
                <RecordingFilters/>
            </Group>
        </>
    );
}

export default TopControlBar;
