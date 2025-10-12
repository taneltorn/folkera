import React from "react";
import {Group, Table} from "@mantine/core";
import {Notification} from "../../../../model/Notification.ts";
import ModifyNotificationButton from "./ModifyNotificationButton.tsx";
import moment from "moment";
import RemoveNotificationButton from "./RemoveNotificationButton.tsx";

interface Properties {
    notification: Notification;
    onChange: () => void;
}

const DateFormat = "DD.MM.yyyy HH:mm";

const NotificationRow: React.FC<Properties> = ({notification, onChange}) => {

    return (
        <Table.Tr>
            <Table.Td>{notification.id}</Table.Td>
            <Table.Td>{notification.title}</Table.Td>
            <Table.Td>{notification.message}</Table.Td>
            <Table.Td>{notification.validFrom ? moment(notification.validFrom).format(DateFormat) : ""}</Table.Td>
            <Table.Td>{notification.validTo ? moment(notification.validTo).format(DateFormat) : ""}</Table.Td>

            <Table.Td>
                <Group gap={4} justify={"end"} wrap={"nowrap"}>
                    <ModifyNotificationButton notification={notification} onChange={onChange}/>
                    <RemoveNotificationButton notification={notification} onChange={onChange}/>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default NotificationRow;
