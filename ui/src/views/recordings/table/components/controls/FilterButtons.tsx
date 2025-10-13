import React from "react";
import {Button, Group, Text} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {Recording} from "../../../../../model/Recording.ts";
import {Color} from "../../../../../utils/constants.ts";
import {useNavigate} from "react-router-dom";

interface Properties {
    recording: Recording;
    field: keyof Recording;
    split?: string;
    color?: string;
    returnHome?: boolean;
    size?: string;
}

const FilterButtons: React.FC<Properties> = ({recording, field, split, size, returnHome}) => {

    const navigate = useNavigate();
    const {addFilter} = useDataContext();

    const values = split
        ? recording[field]
            // @ts-ignore
            ?.split(split)
            // @ts-ignore
            ?.map(it => it.trim())
        : [recording[field]];

    const handleClick = (value: string) => {
        addFilter({field, value, type: "contains"});

        if (returnHome) {
            navigate("/");
        }
    };

    return (
        <Group gap={4}>
            {/* @ts-ignore*/}
            {values?.filter(v => !!v).map((v, i) => (
                <Button key={i}
                        className={"pill-button"}
                    // color={`${chroma.scale(ColorScales.get(field) || "YlOrBr").colors(10)[9 - i % 5]}`}
                        color={`${Color.get(field) || "gray"}.${8 - i % 5}`}
                        size={size || "compact-xs"}
                        onClick={() => handleClick(v)}>
                    <Text size={size || "xs"} className={"pill-button"}>
                        {v}
                    </Text>
                </Button>
            ))}
        </Group>
    );
}

export default FilterButtons;
