import React from "react";
import {Alert, AlertProps} from "@mantine/core";
import {IoMdAlert} from "react-icons/io";
import {Size} from "../utils/constants.ts";

interface Properties extends AlertProps {
    color?: string;
    title?: string;
    message?: string;
}

const InfoMessage: React.FC<Properties> = ({title, message, ...props}) => {

    return (
        <Alert
            title={title}
            icon={<IoMdAlert size={Size.icon.MD}/>}
            {...props}
        >
            {message}
        </Alert>
    );
}

export default InfoMessage;