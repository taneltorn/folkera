import React from "react";
import {MultiSelect} from "@mantine/core";
import {Recording} from "../../../model/Recording.ts";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import RecordingTableHeaderWrapper from "./RecordingTableHeaderWrapper.tsx";

interface Properties {
    field: keyof Recording;
    sortField?: keyof Recording;
    placeholder?: string;
    options?: any[];
}

const RecordingTableHeaderWithSelect: React.FC<Properties> = ({field, sortField, placeholder, options}) => {

    const {filters, addFilter, removeFilter} = useDataFiltering();

    return (
        <RecordingTableHeaderWrapper field={field} sortField={sortField}>
            <MultiSelect
                size={"xs"}
                w={150}
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
        </RecordingTableHeaderWrapper>
    );
}

export default RecordingTableHeaderWithSelect;
