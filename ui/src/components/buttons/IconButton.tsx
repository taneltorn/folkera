import React, {ReactNode} from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Size} from "../../utils/constants.ts";
import {FaRegTrashCan} from "react-icons/fa6";
import { FaRegEye} from "react-icons/fa";
import {AiFillEdit} from "react-icons/ai";
import {MdOutlineClear} from "react-icons/md";

interface Properties {
    type: "open" | "modify" | "remove" | "clear";
    children?: React.ReactNode;
    onClick: () => void;
}

const iconMap = new Map<string, ReactNode>([
    ["open", <FaRegEye size={Size.icon.SM}/>],
    ["modify", <AiFillEdit size={Size.icon.SM}/>],
    ["remove", <FaRegTrashCan size={Size.icon.SM}/>],
    ["clear", <MdOutlineClear size={Size.icon.SM}/>],
])

const IconButton: React.FC<Properties> = ({type, children, onClick}) => {

    const {t} = useTranslation();

    return (
        <Button
            size={"compact-xl"}
            color={"dark"}
            title={t(`button.${type}`)}
            variant={"subtle"}
            onClick={onClick}
        >
            {children || iconMap.get(type)}
        </Button>
    );
}

export default IconButton;
