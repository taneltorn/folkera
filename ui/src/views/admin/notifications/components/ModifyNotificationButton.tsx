import React from "react";
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {Notification} from "../../../../model/Notification.ts";
import useNotifications from "../../../../hooks/useNotifications.tsx";
import NotificationForm from "./NotificationForm.tsx";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {ToastType} from "../../../../context/ToastContext.tsx";
import TableRowButton from "../../../../components/buttons/TableRowButton.tsx";

interface Properties {
    notification: Notification;
    onChange: () => void;
}

const ModifyNotificationButton: React.FC<Properties> = ({notification, onChange}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {updateNotification} = useNotifications();

    const onSubmit = async (values: Notification) => {
        if (notification.id) {
            updateNotification(notification.id, values)
                .then(onChange)
                .then(() => {
                    notify(t("toast.success.modifyNotification"), ToastType.SUCCESS)
                    modals.closeAll();
                });
        }
    }

    const openModal = () =>
        modals.open({
            title: t("modal.modifyNotification.title"),
            centered: true,
            children: (
                <NotificationForm
                    initialValues={notification}
                    onSubmit={onSubmit}
                />
            ),
        });

    return (
        <TableRowButton type={"modify"} onClick={openModal}/>
    );
}

export default ModifyNotificationButton;
