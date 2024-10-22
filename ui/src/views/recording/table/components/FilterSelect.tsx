import React from "react";
import {MultiSelect} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";

interface Properties {
    field: keyof Recording;
    placeholder?: string;
    options?: any[];
}

const FilterSelect: React.FC<Properties> = ({field, placeholder, options}) => {

    const {filters, addFilter, removeFilter} = useDataFiltering();

    return (
        <MultiSelect
            size={"xs"}
            placeholder={placeholder}
            searchable
            clearable
            value={filters
                .filter(f => f.field === field)
                .map(f => f.value as string)}
            onChange={values => addFilter(field, values)}
            onClear={() => removeFilter(field)}
            data={options}
        />
    );
}

export default FilterSelect;
