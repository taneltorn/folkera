import React from 'react';

export enum NotificationType {
    SUCCESS,
    FAILURE,
}

export interface Notification {
    message: string;
    type: NotificationType;
}

export interface Properties {
    activeNotification: Notification | undefined;
    notify: (message: string, type: NotificationType) => void;
}

export const NotificationContext = React.createContext<Properties>({} as Properties);
