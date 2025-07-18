import React from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Button, Group} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import RecordingSearch from "./RecordingSearch.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {RxCheck, RxCross2} from "react-icons/rx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";
import RecordingFilters from "./RecordingFilters.tsx";

const TopControlBar: React.FC = () => {

    const {t} = useTranslation();
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

    return (<>
            <Group justify={"space-between"} mb={"md"}>
                <Group>
                    <RecordingSearch/>
                    <Group visibleFrom={"lg"}>
                        <RecordingFilters/>
                    </Group>
                </Group>

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
            
            <Group hiddenFrom={"lg"}>
                <RecordingFilters/>
            </Group>
        </>
    );
}

export default TopControlBar;
