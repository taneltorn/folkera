import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {RxCheck} from "react-icons/rx";
import {ToastType} from "../../../../context/ToastContext.tsx";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

const SaveModificationsButtons: React.FC = () => {

    const {t} = useTranslation();
    const {state, setState} = useControlState();
    const {modifications, clearModifications} = useModifications();
    const {saveData, loadData} = useDataContext();
    const {notify} = useToasts();

    const handleSave = () => {
        saveData(modifications);
        clearModifications();
        notify(t("toast.success.saveData"), ToastType.SUCCESS);
        setState(ControlState.IDLE);
    };

    const handleClear = () => {
        loadData();
        clearModifications();
        setState(ControlState.IDLE);
    };

    return (<>
            {state === ControlState.SAVE && <>
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
                    color={"dark"}
                    onClick={handleClear}>
                    {t("view.recordings.controls.clear")}
                </Button>
            </>}
        </>
    );
}

export default SaveModificationsButtons;
