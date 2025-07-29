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
    replace?: boolean;
    returnHome?: boolean;
    size?: string;
}

const FilterButtons: React.FC<Properties> = ({recording, field, split, size, replace, returnHome}) => {

    const navigate = useNavigate();
    const {addFilter, useFilter, filters} = useDataContext();

    const values = split
        ? recording[field]
            // @ts-ignore
            ?.split(split)
            // @ts-ignore
            ?.map(it => it.trim())
        : [recording[field]];

    const handleClick = (value: string, event: React.MouseEvent) => {
        const isCtrlPressed = event.ctrlKey;
        if (replace || isCtrlPressed || filters.find(f => f.field === field && ["blank", "not_blank"].includes(f.type as string))) {
            useFilter(field, value, isCtrlPressed ? "exact" : "contains");
        } else {
            if (filters.find(f => f.field === field && f.type === "exact")) {
                useFilter(field, value, "contains");
            } else {
                addFilter(field, value);
            }
        }
        if (returnHome) {
            navigate("/");
        }
    }

    return (
        <Group gap={4}>
            {/* @ts-ignore*/}
            {values?.filter(v => !!v).map((v, i) => (
                <Button key={i}
                        className={"pill-button"}
                        // color={`${chroma.scale(ColorScales.get(field) || "YlOrBr").colors(10)[9 - i % 5]}`}
                        color={`${Color.get(field) || "gray"}.${8 - i % 5}`}
                        size={size || "compact-xs"}
                        onClick={(event) => handleClick(v, event)}>
                    <Text size={size || "xs"} className={"pill-button"}>
                        {v}
                    </Text>
                </Button>
            ))}
        </Group>
    );
}

export default FilterButtons;
