import React, {ReactNode, useMemo} from "react";
import {Button, Menu} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {LuAudioLines} from "react-icons/lu";
import {BsMusicNoteList} from "react-icons/bs";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {Size} from "../../../../../utils/constants.ts";
import {MenuSelectOption} from "../../../../../model/MenuSelectOption.ts";
import {IoMusicalNotes} from "react-icons/io5";

type DataType = "all" | "AUDIO" | "NOOT";

const iconMap = new Map<DataType, ReactNode>([
    ["all", <BsMusicNoteList size={Size.icon.MD}/>],
    ["AUDIO", <LuAudioLines size={Size.icon.MD}/>],
    ["NOOT", <IoMusicalNotes size={Size.icon.MD}/>],
]);

const DataTypeSelector: React.FC = () => {

    const {t} = useTranslation();
    const {filters, useFilter, removeFilter} = useDataContext();

    const options = useMemo<MenuSelectOption[]>(
        () => [
            {value: "all", label: t("view.tunes.details.datatype.all")},
            {value: "AUDIO", label: t("view.tunes.details.datatype.audio")},
            {value: "NOOT", label: t("view.tunes.details.datatype.notation")},
        ],
        [t]
    );

    const selected = (filters.find((f) => f.field === "datatype")?.value ?? "all") as DataType;

    const handleSelect = (value: DataType) => {
        if (value === "all") {
            removeFilter({field: "datatype"});
            return;
        }
        useFilter({field: "datatype", value});
    };

    return (
        <Menu shadow="md" closeOnClickOutside>
            <Menu.Target>
                <Button px={"xs"} size="sm" variant="subtle" title={t("view.tunes.details.datatype.select")}>
                    {iconMap.get(selected)}
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                {options.map((option) => (
                    <Menu.Item
                        key={option.value}
                        onClick={() => handleSelect(option.value as DataType)}
                    >
                        {option.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default DataTypeSelector;