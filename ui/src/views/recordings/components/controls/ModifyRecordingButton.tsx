import React from "react";
import {Title} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {Recording} from "../../../../model/Recording.ts";
import ModifyRecordingForm from "../form/ModifyRecordingForm.tsx";
import {NotificationType} from "../../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../../hooks/useNotifications.tsx";
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
    const {notify} = useNotifications();
    const {state} = useControlState();

    const handleSubmit = () => {
        notify(t("toast.success.saveData"), NotificationType.SUCCESS);
        onChange && onChange();
    }

    const openModifyRecordingModal = () =>
        modals.open({
            title: <Title order={4}>{t("modal.modifyRecording.title")}</Title>,
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
