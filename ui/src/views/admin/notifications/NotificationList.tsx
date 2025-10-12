import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Table} from "@mantine/core";
import useNotifications from "../../../hooks/useNotifications.tsx";
import {Notification} from "../../../model/Notification.ts";
import NotificationRow from "./components/NotificationRow.tsx";
import AddNotificationButton from "./components/AddNotificationButton.tsx";

const NotificationList: React.FC = () => {

    const {t} = useTranslation();
    const {fetchNotifications, cancelSource} = useNotifications();

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchData = () => {
        fetchNotifications().then((data) => {
            setNotifications(data);
        });
    }

    useEffect(() => {
        fetchData();
        return () => cancelSource.cancel();
    }, []);

    return (<>
        <Table mt={"md"}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>{t("notification.id")}</Table.Th>
                    <Table.Th>{t("notification.title")}</Table.Th>
                    <Table.Th>{t("notification.message")}</Table.Th>
                    <Table.Th>{t("notification.validFrom")}</Table.Th>
                    <Table.Th>{t("notification.validTo")}</Table.Th>
                    <Table.Th/>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {notifications.map((notification) => (
                    <NotificationRow
                        key={notification.id}
                        notification={notification}
                        onChange={fetchData}
                    />))}
            </Table.Tbody>
        </Table>

        <AddNotificationButton onChange={fetchData}/>
    </>);
}

export default NotificationList;
