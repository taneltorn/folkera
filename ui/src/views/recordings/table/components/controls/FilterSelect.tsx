import React from "react";
import {MultiSelect, useMantineTheme} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {Recording} from "../../../../../../../domain/Recording.ts";
import {LuFilterX} from "react-icons/lu";

interface Properties {
    field: keyof Recording;
    placeholder?: string;
    options?: any[];
}

const FilterSelect: React.FC<Properties> = ({field, placeholder, options}) => {

    const theme = useMantineTheme();
    const {filters, addFilter, removeFilter} = useDataContext();

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
                // @ts-ignore
                icon: <LuFilterX color={theme.colors.red[9]} />
            }}
        />
    );
}

export default FilterSelect;
