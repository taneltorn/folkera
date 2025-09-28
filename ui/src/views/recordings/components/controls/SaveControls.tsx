import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {RxCheck} from "react-icons/rx";
import {NotificationType} from "../../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../../hooks/useNotifications.tsx";

const SaveControls: React.FC = () => {

    const {t} = useTranslation();
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
    );
}

export default SaveControls;
