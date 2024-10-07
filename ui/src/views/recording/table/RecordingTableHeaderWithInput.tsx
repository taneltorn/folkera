import React, {useEffect, useState} from "react";
import {CloseButton, Input} from "@mantine/core";
import {Recording} from "../../../model/Recording.ts";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import useDebounce from "../../../hooks/useDebounce.ts";
import RecordingTableHeaderWrapper from "./RecordingTableHeaderWrapper.tsx";

interface Properties {
    field: keyof Recording;
    sortField?: keyof Recording;
    placeholder?: string;
}

const RecordingTableHeaderWithInput: React.FC<Properties> = ({field, sortField, placeholder}) => {

    const [value, setValue] = useState<string>("");

    const {filters, addFilter, removeFilter} = useDataFiltering();

    const handleSearch = (value: string) => {
        setValue(value);
        searchRequest();
    };

    const handleClear = () => {
        setValue("");
        removeFilter(field);
    };

    const searchRequest = useDebounce(() => {
        addFilter(field, [value]);
    });

    useEffect(() => {
        const filter = filters.find(f => f.field === field);
        setValue(filter?.value || "");
    }, [filters.find(f => f.field === field)]);

    return (
        <RecordingTableHeaderWrapper field={field} sortField={sortField}>
            <Input
                miw={150}
                size={"xs"}
                c={"red"}
                color={"red"}
                value={value}
                placeholder={placeholder}
                onChange={e => handleSearch(e.currentTarget.value)}
                rightSectionPointerEvents="all"
                rightSection={
                    <CloseButton
                        size={"xs"}
                        className={"hover-pointer"}
                        onClick={handleClear}
                        style={{display: value ? undefined : 'none'}}
                    />
                }
            />
        </RecordingTableHeaderWrapper>
    );
}

export default RecordingTableHeaderWithInput;
