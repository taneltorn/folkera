import React, {useMemo} from "react";
import {MultiSelect} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useDataContext} from "../../../../../hooks/useDataContext";
import {Tune} from "../../../../../model/Tune";
import ClearIcon from "../../../../../components/buttons/ClearIcon.tsx";

export interface GroupedOption {
    group: string;
    items: string[];
}

interface Properties {
    autoFocus?: boolean;
    field: keyof Tune;
    placeholder?: string;
}

type MantineOption = { value: string; label: string };
type MantineGroupedOption = { group: string; items: MantineOption[] };

const FilterSelect: React.FC<Properties> = ({autoFocus, field, placeholder}) => {

    const {t} = useTranslation();

    const {filters, useFilter, addFilter, removeFilter, filteringOptions} = useDataContext();

    const value = filters
        .filter((f) => f.field === field)
        .map((f) => f.value as string);

    const data: MantineGroupedOption[] = useMemo(() => {
        const raw = filteringOptions[field] as GroupedOption[] | undefined;
        if (!raw) return [];

        const toLabel = (v: string) => {
            if (["blank", "not_blank", "true", "false"].includes(v)) return t(`filtering.${v}`);
            if (["OPEN", "RESTRICTED"].includes(v)) return t(`access.${v}`);
            if (["AUDIO", "NOTATION"].includes(v)) return t(`datatype.${v}`);

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
                    addFilter({field, value: v, type: "blank"}, true);
                    return;
                }
                if (v === "not_blank") {
                    addFilter({field, value: v, type: "not_blank"}, true);
                    return;
                }
                if (v === "true") {
                    useFilter({field, value: v, type: "boolean"});
                    return;
                }
                if (v === "false") {
                    useFilter({field, value: v, type: "boolean"});
                    return;
                }

                const hasBlankOrNotBlank = !!filters.find(f => f.field === field && ["blank", "not_blank"].includes(f.value as string));
                addFilter({field, value: v, type: "contains"}, hasBlankOrNotBlank);
            }
        });
    };

    const handleClear = () => {
        removeFilter({field});
    };

    return (
        <MultiSelect
            autoFocus={autoFocus}
            className={filters.some((f) => f.field === field) ? "active-input" : ""}
            placeholder={placeholderText}
            searchable
            clearable
            value={value}
            nothingFoundMessage={t("data.noOptions")}
            onChange={handleChange}
            onClear={handleClear}
            data={data}
            clearSectionMode="clear"
            rightSection={<ClearIcon
                show={true}
                onClick={handleClear}
            />}
        />
    );
};

export default FilterSelect;