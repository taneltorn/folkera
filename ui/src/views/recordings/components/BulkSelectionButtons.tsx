import React from "react";
import {Button} from "@mantine/core";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {useRecordingSelection} from "../../../hooks/useRecordingSelection.tsx";
import {TbCheckbox} from "react-icons/tb";
import BulkModifyRecordingsButton from "./BulkModifyRecordingsButton.tsx";

const BulkSelectionButtons: React.FC = () => {

    const {t} = useTranslation();
    const {isActive, setIsActive, clearSelection} = useRecordingSelection();
    const {modifications} = useModifications();

    const handleSelectionCancel = () => {
        clearSelection();
        setIsActive(false);
    };

    return (
        <>
            {isActive
                ? <>
                    <BulkModifyRecordingsButton/>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        onClick={handleSelectionCancel}>
                        {t("button.cancel")}
                    </Button>
                </>
                : <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    disabled={modifications.length > 0}
                    leftSection={<TbCheckbox size={Size.icon.MD}/>}
                    onClick={() => setIsActive(true)} px={"xs"} mx={0}>
                    {t("view.recordings.controls.selection")}
                </Button>}
        </>

    );
}

export default BulkSelectionButtons;
