import React from "react";
import {Button, Stack} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {IoAddOutline} from "react-icons/io5";

interface Properties {
    label: string;
    onClick: () => void;
}

const AddButton: React.FC<Properties> = ({label, onClick}) => {
    return (
        <Stack gap={"xs"}>
            <Button
                variant="subtle"
                aria-label={label}
                color="dark"
                leftSection={<IoAddOutline size={Size.icon.SM}/>}
                onClick={onClick}
            >
                {label}
            </Button>
        </Stack>
    );
};

export default AddButton;