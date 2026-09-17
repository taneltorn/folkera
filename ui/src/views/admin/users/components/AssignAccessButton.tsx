import React from "react";
import {useTranslation} from "react-i18next";
import {modals} from "@mantine/modals";
import ModalTitle from "../../../tunes/components/controls/ModalTitle.tsx";
import {Button} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import UserAccessSelection from "./UserAccessSelection.tsx";

interface Properties {
    selectedTunes: Tune[];
    onSave: () => void;
    disabled?: boolean;
}

const AssignAccess: React.FC<Properties> = ({selectedTunes, disabled, onSave}) => {

    const {t} = useTranslation();

    const openModal = () =>
        modals.open({
            title: <ModalTitle title={t("modal.assignAccess.title")}/>,
            centered: true,
            children: (
                <UserAccessSelection selectedTunes={selectedTunes} onSave={onSave}/>
            ),
        });

    return (
        <Button disabled={disabled} radius={"xl"} onClick={openModal}>
            {t("button.assignAccess")} ({selectedTunes.length})
        </Button>
    );
}

export default AssignAccess;
