import React from "react";
import {Button, Group} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {Tune} from "../../../../../model/Tune.ts";
import {Color} from "../../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import LimitText from "../../../../../components/LimitText.tsx";

interface Properties {
    tune: Tune;
    field: keyof Tune;
    split?: string;
}

const FilterButtons: React.FC<Properties> = ({tune, field, split}) => {

    const {t} = useTranslation();
    const {addFilter} = useDataContext();

    const rawValue = tune[field];
    const values =
        typeof rawValue === "string"
            ? split
                ? rawValue.split(split).map(it => it.trim())
                : [rawValue]
            : [];

    const handleClick = (value: string) => {
        addFilter({field, value, type: "contains"});
    };

    return (
        <Group gap={4}>
            {/* @ts-ignore*/}
            {values?.filter(v => !!v).map((v, i) => (
                <Button key={i}
                        radius={"md"}
                        variant={"filled"}
                        color={`${Color.get(field) || "gray"}.${8 - i % 5}`}
                        size={"compact-xs"}
                        onClick={() => handleClick(v)}>
                    <LimitText
                        textWrap={"nowrap"}
                        limit={30}
                        size={"xs"}
                        text={["access", "datatype"].includes(field)
                            ? t(`${field}.${v}`)
                            : v}/>
                </Button>
            ))}
        </Group>
    );
}

export default FilterButtons;
