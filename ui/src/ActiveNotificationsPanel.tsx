import React, {useEffect, useState} from 'react';
import {Alert, Group, Text} from "@mantine/core";
import useNotifications from "./hooks/useNotifications.tsx";
import {Notification} from "./model/Notification.ts";

const ActiveNotificationsPanel: React.FC = () => {

    const [activeNotifications, setActiveNotifications] = useState<Notification[]>([]);
    const {fetchActiveNotifications} = useNotifications();

    const hideNotification = (notification: Notification) => {
        setActiveNotifications(activeNotifications.filter(n => n.id !== notification.id))
    }

    useEffect(() => {
        fetchActiveNotifications().then(setActiveNotifications)
    }, []);

    return (
        <>
            {activeNotifications.map(n => (
                <Alert
                    key={`notification-${n.id}`}
                    color={"blue"}
                    variant={"light"}
                    radius={0}
                    mb={"xs"}
                    withCloseButton
                    onClose={() => hideNotification(n)}
                >
                    <Group>
                        <Text fw={"bold"}>{n.title}</Text>
                        <Text>
                            {n.message}
                        </Text>
                    </Group>
                </Alert>
            ))}
        </>
    );
}

export default ActiveNotificationsPanel;
