import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Button, Group} from "@mantine/core";
import {FaFileExport, FaSave} from "react-icons/fa";
import {Size} from "../../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import {useDataService} from "../../../hooks/useDataService.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";
import RecordingSearch from "./components/RecordingSearch.tsx";
import RecordingFilters from "./components/RecordingFilters.tsx";

const RecordingTopControls: React.FC = () => {

    const {t} = useTranslation();
    const {
        filters,
        filteredData,
        clearFilters,
    } = useDataFiltering();

    const {exportData, saveData} = useDataService();
    const {modifications, clearModifications} = useModifications();
    const {notify} = useNotifications();

    const handleSave = () => {
        saveData(modifications)
            .then(() => {
                notify(t("toast.success.saveData"), NotificationType.SUCCESS)
            })
            .catch(e => notify(t("toast.error.saveData"), NotificationType.ERROR, e));
        clearModifications();
    };

    const handleDataExport = () => {
        exportData(filteredData, filters)
            .then(() => {
                notify(t("toast.success.exportData", {count: filteredData.length}))
            })
            .catch(e => notify(t("toast.error.exportData"), NotificationType.ERROR, e));
    }

    return (
        <Group px={"md"} justify={"space-between"} bg={"white"} mb={"xs"}>
            <Group>
                <RecordingSearch/>
                <RecordingFilters/>
            </Group>

            <Group gap={4}>
                {!!filters.length &&
                    <Button
                        variant={"subtle"}
                        size={"xs"}
                        color={"dark"}
                        leftSection={<LuFilterX size={Size.icon.SM}/>}
                        onClick={clearFilters}>
                        {t("view.recordings.controls.clearFilters")}
                    </Button>}

                {modifications.length > 0 &&
                    <Button
                        variant={"subtle"}
                        size={"xs"}
                        color={"dark"}
                        leftSection={<FaSave size={Size.icon.SM}/>}
                        onClick={handleSave}>
                        {t("view.recordings.controls.save")}
                    </Button>}

                <Button
                    variant={"subtle"}
                    size={"xs"}
                    color={"dark"}
                    leftSection={<FaFileExport size={Size.icon.SM}/>}
                    onClick={handleDataExport} px={"xs"} mx={0}>
                    {t("view.recordings.controls.export")}
                </Button>
            </Group>
        </Group>
    );
}

export default RecordingTopControls;
