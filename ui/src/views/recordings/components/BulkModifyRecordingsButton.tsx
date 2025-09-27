import React from "react";
import {Title} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {MdAssignment} from "react-icons/md";
import {Size} from "../../../utils/constants.ts";
import BulkModifyRecordingsForm from "./BulkModifyRecordingsForm.tsx";
import {useRecordingSelection} from "../../../hooks/useRecordingSelection.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {BulkModifyFields} from "../../../model/BulkModifyFields.ts";
import {useDataContext} from "../../../hooks/useDataContext.tsx";

interface Properties {
}

const BulkModifyRecordingsButton: React.FC<Properties> = () => {

    const {t} = useTranslation();
    const {data} = useDataContext();
    const {setModifications} = useModifications();
    const {selection, clearSelection, setIsActive} = useRecordingSelection();

    const handleSubmit = (values: BulkModifyFields) => {
        const modifications = selection.map(recording => ({
            ...recording,
            tune: values.tune,
            datatype: values.datatype
        }));

        selection.forEach(r => {
            const recording = data.find(d => d.id === r.id);
            if (recording) {
                recording.tune = values.tune;
                recording.datatype = values.datatype;
            }
        })

        setModifications(modifications);

        handleCancel();
    }

    const handleCancel = () => {
        clearSelection();
        setIsActive(false);
        modals.closeAll();
    }

    const openModifyRecordingModal = () =>
        modals.open({
            title: <Title order={4}>{t("modal.bulkModifyRecordings.title", {count: selection.length})}</Title>,
            size: "sm",
            children: (
                <BulkModifyRecordingsForm
                    selection={selection}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            ),
        });

    return (
        <Button
            variant={"subtle"}
            size={"sm"}
            color={"dark"}
            disabled={selection.length === 0}
            leftSection={<MdAssignment size={Size.icon.MD}/>}
            onClick={openModifyRecordingModal}
        >
            {t("view.recordings.controls.bulkModify")}
        </Button>
    );
}

export default BulkModifyRecordingsButton;
