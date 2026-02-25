import React, {ReactNode} from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {RiEdit2Fill} from "react-icons/ri";
import {Size} from "../../utils/constants.ts";
import {FaRegTrashCan} from "react-icons/fa6";

interface Properties {
    type: "modify" | "remove";
    onClick: () => void;
}

const iconMap = new Map<string, ReactNode>([
    ["modify", <RiEdit2Fill size={Size.icon.SM}/>],
    ["remove", <FaRegTrashCan size={Size.icon.SM}/>],
])

const TableRowButton: React.FC<Properties> = ({type, onClick}) => {

    const {t} = useTranslation();

    return (
        <Button
            size={"compact-xl"}
            color={"dark"}
            title={t(`button.${type}`)}
            variant="light"
            onClick={onClick}
        >
            {iconMap.get(type)}
        </Button>
    );
}

export default TableRowButton;
