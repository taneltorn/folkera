import React from "react";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import ModifyTuneForm from "../form/ModifyTuneForm.tsx";
import {ToastType} from "../../../../context/ToastContext.tsx";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

interface Properties {
    tune: Tune;
    variant?: string;
    size?: string;
    color?: string;
    leftSection?: React.ReactNode;
    onChange?: () => void;
    children?: React.ReactNode;
}

const ModifyTuneButton: React.FC<Properties> = ({tune, onChange, children, ...props}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {state} = useControlState();

    const handleSubmit = () => {
        notify(t("toast.success.saveData"), ToastType.SUCCESS);
        onChange && onChange();
    }

    const openModal = () =>
        modals.open({
            title: t("modal.modifyTune.title", {ref: tune.ref}),
            size: "lg",
            children: (
                <ModifyTuneForm
                    initialValues={tune}
                    onSubmit={handleSubmit}
                />
            ),
        });

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    size={props.size || "md"}
                    color={props.color || "dark"}
                    variant={props.variant || "subtle"}
                    leftSection={props.leftSection}
                    onClick={openModal}
                >
                    {children}
                </Button>}
        </>
    );
}

export default ModifyTuneButton;
