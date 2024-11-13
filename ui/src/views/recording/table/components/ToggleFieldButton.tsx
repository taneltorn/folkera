import React from "react";
import {Button, Group, useMantineTheme} from "@mantine/core";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import {RiCollapseDiagonalFill, RiExpandDiagonalFill} from "react-icons/ri";
import {Size} from "../../../../utils/common.constants.ts";
import {Recording} from "../../../../../../domain/Recording.ts";

interface Properties {
    field: keyof Recording;
}

const SortButton: React.FC<Properties> = ({field}) => {

    const theme = useMantineTheme();
    const {
        hiddenFields,
        toggleField,
    } = useDataFiltering();

    return (
        <Group>
            <Button
                px={0}
                size={"compact-xs"}
                color={theme.colors.dark[1]}
                // color={field === sort?.field ? theme.primaryColor : theme.colors.dark[1]}
                variant={"transparent"}
                onClick={() => toggleField(field)}
            >
                {hiddenFields.includes(field)
                    ? <RiExpandDiagonalFill size={Size.icon.MD}/>
                    : <RiCollapseDiagonalFill size={Size.icon.MD}/>}
            </Button>
        </Group>
    );
}

export default SortButton;
