import React, {useContext, useMemo} from 'react';
import {isEmpty} from "../utils/common.helpers.tsx";
import {
    NotificationContext,
    NotificationType,
    NotificationTypeFeatures
} from "../context/NotificationContext.tsx";
import {notifications} from "@mantine/notifications";

interface Properties {
    children: React.ReactNode;
}

export const NotificationContextProvider: React.FC<Properties> = ({children}) => {

    const notify = (message: string, type?: NotificationType, error?: Error) => {
        if (error) {
            console.error(error);
        }
        notifications.show({
            color: NotificationTypeFeatures.get(type || NotificationType.INFO)?.color,
            message: error ? `${message}: ${error.message}` : message,
            p: "md",
            radius: "sm",
            withBorder: true,
            icon: NotificationTypeFeatures.get(type || NotificationType.INFO)?.icon,
        });
    }

    const context = useMemo(() => ({
        notify,
    }), []);

    return (
        <NotificationContext.Provider value={context}>
            {children}
        </NotificationContext.Provider>);
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (isEmpty(context)) {
        throw new Error('useNotifications must be used within a NotificationContextProvider')
    }

    return context;
};
