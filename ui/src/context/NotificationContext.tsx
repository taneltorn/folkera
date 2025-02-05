import React from 'react';
import {Size} from "../utils/common.constants.ts";
import {RiErrorWarningFill} from "react-icons/ri";
import {FaRegCheckCircle} from "react-icons/fa";

export enum NotificationType {
    INFO,
    SUCCESS,
    ERROR,
}

export const NotificationTypeFeatures = new Map([
    [NotificationType.INFO, {color: 'blue', icon: <FaRegCheckCircle size={Size.icon.MD}/>}],
    [NotificationType.SUCCESS, {color: 'green', icon: <FaRegCheckCircle size={Size.icon.MD}/>}],
    [NotificationType.ERROR, {color: 'red', icon: <RiErrorWarningFill size={Size.icon.MD}/>}],
]);

export interface Properties {
    notify: (message: string, type?: NotificationType, error?: Error) => void;
}

export const NotificationContext = React.createContext<Properties>({} as Properties);
