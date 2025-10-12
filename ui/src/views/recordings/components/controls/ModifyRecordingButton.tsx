import React from "react";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {Recording} from "../../../../model/Recording.ts";
import ModifyRecordingForm from "../form/ModifyRecordingForm.tsx";
import {ToastType} from "../../../../context/ToastContext.tsx";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

interface Properties {
    recording: Recording;
    variant?: string;
    size?: string;
    color?: string;
    leftSection?: React.ReactNode;
    onChange?: () => void;
    children?: React.ReactNode;
}

const ModifyRecordingButton: React.FC<Properties> = ({recording, onChange, children, ...props}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {state} = useControlState();

    const handleSubmit = () => {
        notify(t("toast.success.saveData"), ToastType.SUCCESS);
        onChange && onChange();
    }

    const openModifyRecordingModal = () =>
        modals.open({
            title: t("modal.modifyRecording.title", {ref: recording.ref}),
            size: "lg",
            children: (
                <ModifyRecordingForm
                    initialValues={recording}
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
                    onClick={openModifyRecordingModal}
                >
                    {children}
                </Button>}
        </>
    );
}

export default ModifyRecordingButton;
