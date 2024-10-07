import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {LuFilterX} from "react-icons/lu";
import {Size} from "../utils/common.constants.ts";

interface Properties {
    show: boolean;
    onClick: () => void;
}

const ClearFiltersButton: React.FC<Properties> = ({show, onClick}) => {

    const theme = useMantineTheme();

    return (
        <>
            {show &&
                <Button
                    variant={"transparent"}
                    onClick={onClick}
                >
                    <LuFilterX size={Size.icon.MD} color={theme.colors.red[9]}/>
                </Button>}
        </>
    );
}

export default ClearFiltersButton;
