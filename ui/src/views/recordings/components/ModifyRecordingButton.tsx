import React from "react";
import {Title} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {Recording} from "../../../model/Recording.ts";
import ModifyRecordingForm from "./ModifyRecordingForm.tsx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";

interface Properties {
    recording: Recording;
    variant?: string;
    size?: string;
    leftSection?: React.ReactNode;
    onChange?: () => void;
    children?: React.ReactNode;
}

const ModifyRecordingButton: React.FC<Properties> = ({recording, onChange, children, ...props}) => {

    const {t} = useTranslation();
    const {notify} = useNotifications();

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

    return (
        <Button
            size={props.size || "md"}
            variant={props.variant}
            leftSection={props.leftSection}
            onClick={openModifyRecordingModal}
        >
            {children}
        </Button>
    );
}

export default ModifyRecordingButton;
