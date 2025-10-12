import React from "react";
import {Text} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import useNotifications from "../../../../hooks/useNotifications.tsx";
import {Notification} from "../../../../model/Notification.ts";
import TableRowButton from "../../../../components/buttons/TableRowButton.tsx";

interface Properties {
    notification: Notification;
    onChange: () => void;
}

const RemoveNotificationButton: React.FC<Properties> = ({notification, onChange}) => {

    const {t} = useTranslation();
    const {removeNotification} = useNotifications();

    const openModal = () =>
        modals.openConfirmModal({
            title: t("modal.removeNotification.title"),
            centered: true,
            children: (
                <Text size={"sm"}>
                    {t("modal.removeNotification.content")}
                </Text>
            ),
            labels: {
                confirm: t("modal.removeNotification.confirm"),
                cancel: t("modal.removeNotification.cancel")
            },
            confirmProps: {color: 'red'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => notification.id && removeNotification(notification.id).then(onChange),
        });

    return (
        <TableRowButton type={"remove"} onClick={openModal}/>
    );
}

export default RemoveNotificationButton;
