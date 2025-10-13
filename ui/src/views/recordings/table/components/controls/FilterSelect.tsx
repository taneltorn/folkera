import React from "react";
import {MultiSelect, useMantineTheme} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {Recording} from "../../../../../model/Recording.ts";
import {LuFilterX} from "react-icons/lu";

interface Properties {
    field: keyof Recording;
    placeholder?: string;
}

const FilterSelect: React.FC<Properties> = ({field, placeholder}) => {

    const theme = useMantineTheme();
    const {filters, useFilter, addFilter, removeFilter} = useDataContext();
    const {filteringOptions} = useDataContext();

    const value = filters
        .filter(f => f.field === field)
        .map(f => f.value as string);

    const handleChange = (values: string[]) => {
        filters.forEach(f => {
            if (!values.find(v => v === f.value) && f.field === field) {
                removeFilter({field: f.field, value: f.value});
            }
        })

        values.forEach(v => {
            if (!filters.find(f => f.field === field && f.value === v)) {
                if (v === "blank") {
                    useFilter({field: field, value: v, type: "blank"});
                    return;
                }
                if (v === "not_blank") {
                    useFilter({field: field, value: v, type: "not_blank"});
                    return;
                }
                const type = field === "year" ? "exact" : "contains";
                addFilter({field: field, value: v, type: type}, field === "year" );
            }
        })
    }
    
    const handleClear = () => {
        console.log("clear")
        removeFilter({field: field})
    }

    return (
        <MultiSelect
            size={"xs"}
            miw={100}
            w={"100%"}
            maw={150}
            className={filters.find(f => f.field === field) ? "active-input" : ""}
            placeholder={value?.length ? value.join(", ") : placeholder}
            searchable
            clearable
            value={value}
            onChange={handleChange}
            onClear={handleClear}
            // onClear={() => removeFilter({field: field})}
            data={filteringOptions[field] || []}
            clearButtonProps={{
                // @ts-ignore
                icon: <LuFilterX color={theme.colors.red[9]}/>
            }}
        />
    );
}

export default FilterSelect;
