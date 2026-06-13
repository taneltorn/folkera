import React, {useMemo} from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import AdvancedMenu, {SelectMenuItem} from "../../../../../components/AdvancedMenu.tsx";
import {IconMap} from "../../../../../utils/icons.tsx";

type DataType = "all" | "AUDIO" | "NOTATION";

const DataTypeSelector: React.FC = () => {

    const {t} = useTranslation();
    const {filters, useFilter, removeFilter} = useDataContext();

    const options = useMemo<SelectMenuItem[]>(
        () => [
            {
                value: "all",
                label: t("page.tunes.details.datatype.all"),
                leftSection: IconMap.get("all"),
            },
            {
                value: "AUDIO",
                label: t("page.tunes.details.datatype.audio"),
                leftSection: IconMap.get("AUDIO"),

            },
            {
                value: "NOTATION",
                label: t("page.tunes.details.datatype.notation"),
                leftSection: IconMap.get("NOTATION"),
            },
        ],
        [t]
    );
    const selected = (filters.find((f) => f.field === "datatype")?.value ?? "all") as DataType;

    const handleSelect = (value: string) => {
        if (value === "all") {
            removeFilter({field: "datatype"});
            return;
        }
        useFilter({field: "datatype", value});
    };

    return (
        <AdvancedMenu
            target={
                <Button px={"xs"} color={"gray"} size="sm" variant="subtle"
                        title={t("page.tunes.details.datatype.select")}>
                    {IconMap.get(selected)}
                </Button>
            }
            items={options}
            onChange={handleSelect}
        />
    );
};

export default DataTypeSelector;