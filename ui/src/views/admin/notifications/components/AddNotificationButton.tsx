import React from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@mantine/core";
import {FaPlus} from "react-icons/fa";
import {modals} from "@mantine/modals";
import {Notification} from "../../../../model/Notification.ts";
import useNotifications from "../../../../hooks/useNotifications.tsx";
import NotificationForm from "./NotificationForm.tsx";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {ToastType} from "../../../../context/ToastContext.tsx";

interface Properties {
    onChange: () => void;
}

const InitialValues: Notification = {
    title: '',
    message: '',
    validFrom: null,
    validTo: null,
}

const AddNotificationButton: React.FC<Properties> = ({onChange}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {createNotification} = useNotifications();

    const onSubmit = async (values: Notification) => {
        createNotification(values)
            .then(() => onChange())
            .then(() => {
                notify(t("toast.success.createNotification"), ToastType.SUCCESS)
                modals.closeAll();
            });
    }

    const openModal = () =>
        modals.open({
            title: t("modal.createNotification.title"),
            centered: true,
            children: (
                <NotificationForm
                    initialValues={InitialValues}
                    onSubmit={onSubmit}
                    resetOnSubmit
                />
            ),
        });

    return (
        <Button
            mt={"md"}
            variant={"subtle"}
            leftSection={<FaPlus/>}
            onClick={openModal}>
            {t("button.addNew")}
        </Button>
    );
}

export default AddNotificationButton;
