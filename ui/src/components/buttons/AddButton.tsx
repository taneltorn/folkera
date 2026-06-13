import React from "react";
import {Button} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {IoAddOutline} from "react-icons/io5";

interface Properties {
    label: string;
    onClick: () => void;
}

const AddButton: React.FC<Properties> = ({label, onClick}) => {
    return (
        <Button
            radius={"xl"}
            variant="subtle"
            color={"gray"}
            aria-label={label}
            leftSection={<IoAddOutline size={Size.icon.SM}/>}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default AddButton;