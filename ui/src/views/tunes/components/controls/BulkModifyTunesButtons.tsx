import React from "react";
import {Button} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import {MdAssignment} from "react-icons/md";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {BulkModifyFields} from "../../../../model/BulkModifyFields.ts";
import {modals} from "@mantine/modals";
import BulkModifyTunesForm from "../form/BulkModifyTunesForm.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";

const BulkModifyTunesButtons: React.FC = () => {

    const {t} = useTranslation();

    const {state, setState} = useControlState();
    const {data} = useDataContext();
    const {setModifications} = useModifications();
    const {selection, clearSelection} = useTuneSelection();

    const handleSubmit = (values: BulkModifyFields) => {
        const modifications = selection.map(tune => ({
            ...tune,
            tune: values.melody,
            trainset: values.trainset
        }));

        selection.forEach(r => {
            const tune = data.find(d => d.id === r.id);
            if (tune) {
                tune.melody = values.melody;
                tune.trainset = values.trainset;
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

    const openModal = () =>
        modals.open({
            title: t("modal.bulkModifyTunes.title", {count: selection.length}),
            size: "md",
            children: (
                <BulkModifyTunesForm
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
                    disabled={selection.length === 0}
                    leftSection={<MdAssignment size={Size.icon.MD}/>}
                    onClick={openModal}
                >
                    {t("view.tunes.controls.bulkModify")}
                </Button>
                <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    onClick={handleSelectionCancel}>
                    {t("button.cancel")}
                </Button>
            </>}
        </>
    );
}

export default BulkModifyTunesButtons;
