import React from "react";
import {Button, Title} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {useRecordingSelection} from "../../../../hooks/useRecordingSelection.tsx";
import {MdAssignment} from "react-icons/md";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {BulkModifyFields} from "../../../../model/BulkModifyFields.ts";
import {modals} from "@mantine/modals";
import BulkModifyRecordingsForm from "../form/BulkModifyRecordingsForm.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";

const BulkModifyRecordingsButtons: React.FC = () => {

    const {t} = useTranslation();

    const {state, setState} = useControlState();
    const {data} = useDataContext();
    const {setModifications} = useModifications();
    const {selection, clearSelection} = useRecordingSelection();

    const handleSubmit = (values: BulkModifyFields) => {
        const modifications = selection.map(recording => ({
            ...recording,
            tune: values.tune,
            trainset: values.trainset
        }));

        selection.forEach(r => {
            const recording = data.find(d => d.id === r.id);
            if (recording) {
                recording.tune = values.tune;
                recording.trainset = values.trainset;
            }
        })

        setModifications(modifications);
        clearSelection();
        modals.closeAll();

        setState(ControlState.SAVE);
    }

    const handleCancel = () => {
        modals.closeAll();
    }

    const openModifyRecordingModal = () =>
        modals.open({
            title: <Title order={4}>{t("modal.bulkModifyRecordings.title", {count: selection.length})}</Title>,
            size: "md",
            children: (
                <BulkModifyRecordingsForm
                    selection={selection}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            ),
        });

    const handleSelectionCancel = () => {
        clearSelection();
        setState(ControlState.IDLE);
    };

    return (
        <>
            {state === ControlState.SELECT && <>
                <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    onClick={handleSelectionCancel}>
                    {t("button.cancel")}
                </Button>
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
            </>}
        </>
    );
}

export default BulkModifyRecordingsButtons;
