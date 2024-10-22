import React from "react";
import {Button, Group, Text} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";

interface Properties {
    recording: Recording;
    field: keyof Recording;
    split?: string;
    color?: string;
}

const FilterButtons: React.FC<Properties> = ({recording, field, split, color}) => {

    const {addFilter} = useDataFiltering();

    const values = split
        ? recording[field]
            // @ts-ignore
            ?.split(split)
            // @ts-ignore
            ?.map(it => it.trim())
        : [recording[field]];

    const handleClick = (value: string) => {
        addFilter(field, [value]);
    }

    return (
        <Group gap={4}>
            {/* @ts-ignore*/}
            {values.filter(v => !!v).map((v, i) => (
                <Button key={i}
                        className={"pill-button"}
                        color={`${color || "blue"}.${9 - i % 5}`}
                        size={"compact-xs"}
                        onClick={() => handleClick(v)}>
                    <Text size={"xs"} className={"pill-button"}>
                        {v}
                    </Text>
                </Button>
            ))}
        </Group>
    );
}

export default FilterButtons;
