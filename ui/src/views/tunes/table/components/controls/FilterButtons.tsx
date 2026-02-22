import React from "react";
import {Button, Group, Text} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {Tune} from "../../../../../model/Tune.ts";
import {Color} from "../../../../../utils/constants.ts";
import {useNavigate} from "react-router-dom";

interface Properties {
    tune: Tune;
    field: keyof Tune;
    split?: string;
    color?: string;
    returnHome?: boolean;
    size?: string;
}

const FilterButtons: React.FC<Properties> = ({tune, field, split, size, returnHome}) => {

    const navigate = useNavigate();
    const {addFilter} = useDataContext();

    const values = split
        ? tune[field]
            // @ts-ignore
            ?.split(split)
            // @ts-ignore
            ?.map(it => it.trim())
        : [tune[field]];

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
