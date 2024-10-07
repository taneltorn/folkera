import {notifications} from "@mantine/notifications";
import {Size} from "./common.constants.ts";
import {FaRegCheckCircle} from "react-icons/fa";
import {RiErrorWarningFill} from "react-icons/ri";

export const isEmpty = (object: any) => {
    return !object || Object.keys(object).length === 0 || object.length === 0;
}

export const DisplayError = (error: Error, message: string) => {
    notifications.show({
        color: 'red',
        message: error?.message ? `${message}: ${error.message}` : message,
        p: "md",
        radius: "sm",
        withBorder: true,
        icon: <RiErrorWarningFill size={Size.icon.MD}/>,
});
}

export const DisplaySuccess = (message: string) => {
    notifications.show({
        color: 'white',
        message: message,
        p: "md",
        radius: "sm",
        withBorder: true,
        icon: <FaRegCheckCircle color={"green"} size={Size.icon.MD}/>,
});
}

export const hex2rgba = (hex: string, alpha: number = 1) => {
        const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
};