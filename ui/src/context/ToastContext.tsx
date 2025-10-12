import React from 'react';
import {Size} from "../utils/constants.ts";
import {RiErrorWarningFill} from "react-icons/ri";
import {FaRegCheckCircle} from "react-icons/fa";

export enum ToastType {
    INFO,
    SUCCESS,
    ERROR,
}

export const NotificationTypeFeatures = new Map([
    [ToastType.INFO, {color: 'blue', icon: <FaRegCheckCircle size={Size.icon.MD}/>}],
    [ToastType.SUCCESS, {color: 'green', icon: <FaRegCheckCircle size={Size.icon.MD}/>}],
    [ToastType.ERROR, {color: 'red', icon: <RiErrorWarningFill size={Size.icon.MD}/>}],
]);

export interface Properties {
    notify: (message: string, type?: ToastType, error?: any) => void;
}

export const ToastContext = React.createContext<Properties>({} as Properties);
