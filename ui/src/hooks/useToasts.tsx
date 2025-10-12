import React, {useContext, useMemo} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {
    ToastContext,
    ToastType,
    NotificationTypeFeatures
} from "../context/ToastContext.tsx";
import {notifications} from "@mantine/notifications";

interface Properties {
    children: React.ReactNode;
}

export const ToastContextProvider: React.FC<Properties> = ({children}) => {

    const notify = (message: string, type?: ToastType, error?: any) => {
        if (error) {
            console.error(error);
        }
        notifications.show({
            color: NotificationTypeFeatures.get(type || ToastType.INFO)?.color,
            message: error ? `${message}: ${error?.message}` : message,
            p: "md",
            radius: "sm",
            withBorder: true,
            icon: NotificationTypeFeatures.get(type || ToastType.INFO)?.icon,
        });
    }

    const context = useMemo(() => ({
        notify,
    }), []);

    return (
        <ToastContext.Provider value={context}>
            {children}
        </ToastContext.Provider>);
}

export const useToasts = () => {
    const context = useContext(ToastContext);
    if (isEmpty(context)) {
        throw new Error('useToasts must be used within a ToastContextProvider')
    }

    return context;
};
