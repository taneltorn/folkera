import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/common.helpers.tsx";
import {NotificationContext, Notification, NotificationType} from "../context/NotificationContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const NotificationContextProvider: React.FC<Properties> = ({children}) => {

    const [activeNotification, setActiveNotification] = useState<Notification>();

    const notify = (message: string, type: NotificationType) => {
        setActiveNotification({
            message: message,
            groupBy: type
        });
        setTimeout(() => setActiveNotification(undefined), 2000);
    }

    const context = useMemo(() => ({
        activeNotification,
        notify,
    }), [activeNotification]);

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
