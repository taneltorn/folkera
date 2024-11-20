import React from "react";
import {MultiSelect} from "@mantine/core";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";
import {LuFilterX} from "react-icons/lu";

interface Properties {
    field: keyof Recording;
    placeholder?: string;
    options?: any[];
}

const FilterSelect: React.FC<Properties> = ({field, placeholder, options}) => {

    const {filters, addFilter, removeFilter} = useDataFiltering();

    const value = filters
        .filter(f => f.field === field)
        .map(f => f.value as string);

    return (
        <MultiSelect
            size={"xs"}
            maw={150}
            className={filters.find(f => f.field === field) ? "active-input" : ""}
            placeholder={value?.length ? value.join(", ") : placeholder}
            searchable
            clearable
            value={value}
            onChange={values => addFilter(field, values)}
            onClear={() => removeFilter(field)}
            data={options}
            clearButtonProps={{
                icon: <LuFilterX />
            }}
        />
    );
}

export default FilterSelect;
