import React, {useEffect, useState} from "react";
import {Input, useMantineTheme} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import useDebounce from "../../../../../hooks/useDebounce.ts";
import {Recording} from "../../../../../../../domain/Recording.ts";
import {LuFilterX} from "react-icons/lu";

interface Properties {
    field: keyof Recording;
    placeholder?: string;
}

const FilterInput: React.FC<Properties> = ({field, placeholder}) => {

    const theme = useMantineTheme();
    const {filters, addFilter, removeFilter} = useDataContext();

    const [value, setValue] = useState<string>("");

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
        <Input
            miw={150}
            size={"xs"}
            className={filters.find(f => f.field === field) ? "active-input" : ""}
            value={value}
            placeholder={placeholder}
            onChange={e => handleSearch(e.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
                <LuFilterX
                    size={16}
                    color={theme.colors.red[9]}
                    className={"hover-pointer"}
                    onClick={handleClear}
                    style={{display: value ? undefined : 'none'}}
                />
            }
        />
    );
}

export default FilterInput;
