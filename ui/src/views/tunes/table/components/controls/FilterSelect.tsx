import React, {useMemo} from "react";
import {MultiSelect, useMantineTheme} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";

import {useDataContext} from "../../../../../hooks/useDataContext";
import {Tune} from "../../../../../model/Tune";

export interface GroupedOption {
    group: string;
    items: string[];
}

interface Properties {
    field: keyof Tune;
    placeholder?: string;
}

type MantineOption = { value: string; label: string };
type MantineGroupedOption = { group: string; items: MantineOption[] };

const FilterSelect: React.FC<Properties> = ({field, placeholder}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();

    const {filters, useFilter, addFilter, removeFilter, filteringOptions} = useDataContext();

    const value = filters
        .filter((f) => f.field === field)
        .map((f) => f.value as string);

    const data: MantineGroupedOption[] = useMemo(() => {
        const raw = filteringOptions[field] as GroupedOption[] | undefined;
        if (!raw) return [];

        const toLabel = (v: string) => {
            if (v === "blank") return t("filtering.blank");
            if (v === "not_blank") return t("filtering.not_blank");
            return v;
        };

        return raw.map((g) => ({
            group: g.group,
            items: g.items.map((v) => ({value: v, label: toLabel(v)})),
        }));
    }, [filteringOptions, field, t]);

    const placeholderText = useMemo(() => {
        if (!value.length) return placeholder;

        const labelByValue = new Map<string, string>();
        data.forEach((g) => g.items.forEach((it) => labelByValue.set(it.value, it.label)));

        return value.map((v) => labelByValue.get(v) ?? v).join(", ");
    }, [value, data, placeholder]);

    const handleChange = (values: string[]) => {
        filters.forEach((f) => {
            if (f.field === field && !values.includes(f.value as string)) {
                removeFilter({field: f.field, value: f.value});
            }
        });

        values.forEach((v) => {
            if (!filters.find((f) => f.field === field && f.value === v)) {
                if (v === "blank") {
                    useFilter({field, value: v, type: "blank"});
                    return;
                }
                if (v === "not_blank") {
                    useFilter({field, value: v, type: "not_blank"});
                    return;
                }
                addFilter({field, value: v, type: "contains"});
            }
        });
    };

    const handleClear = () => {
        removeFilter({field});
    };

    return (
        <MultiSelect
            size="xs"
            miw={100}
            w="100%"
            maw={150}
            className={filters.some((f) => f.field === field) ? "active-input" : ""}
            placeholder={placeholderText}
            searchable
            clearable
            value={value}
            onChange={handleChange}
            onClear={handleClear}
            data={data}
            clearButtonProps={{
                // @ts-ignore Mantine typing here is sometimes strict about icon type
                icon: <LuFilterX color={theme.colors.red[9]}/>,
            }}
        />
    );
};

export default FilterSelect;