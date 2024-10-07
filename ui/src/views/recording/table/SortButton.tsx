import React from "react";
import {Button, Group, useMantineTheme} from "@mantine/core";
import {Recording} from "../../../model/Recording.ts";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {RiSortAsc, RiSortDesc} from "react-icons/ri";
import {Size} from "../../../utils/common.constants.ts";
import {SortDirection} from "../../../context/DataFilteringContext.tsx";

interface Properties {
    field: keyof Recording;
}

const SortButton: React.FC<Properties> = ({field}) => {

    const theme = useMantineTheme();
    const {
        sort,
        setSort,
    } = useDataFiltering();

    return (
        <Group>
            <Button
                px={0}
                size={"compact-xs"}
                color={field === sort?.field ? theme.primaryColor : theme.colors.dark[1]}
                variant={"transparent"}
                onClick={() => setSort({
                    field: field,
                    direction: sort?.field === field && sort?.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
                })}
            >
                {sort?.field === field && sort?.direction === SortDirection.DESC
                    ? <RiSortAsc size={Size.icon.MD}/>
                    : <RiSortDesc size={Size.icon.MD}/>}
            </Button>
        </Group>
    );
}

export default SortButton;
