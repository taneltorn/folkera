import React, {useEffect, useState} from "react";
import {Autocomplete} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import useDebounce from "../../../../../hooks/useDebounce.ts";
import {Tune} from "../../../../../model/Tune.ts";
import ClearIcon from "../../../../../components/buttons/ClearIcon.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    autoFocus?: boolean;
    field: keyof Tune;
    placeholder?: string;
}

const FilterInput: React.FC<Properties> = ({autoFocus, field}) => {

    const {t} = useTranslation();

    const {filters, useFilter, removeFilter, filteringOptions} = useDataContext();

    const [value, setValue] = useState<string>("");

    const handleSearch = (value: string) => {
        if (value) {
            setValue(value);
            searchRequest();
        } else {
            handleClear();
        }
    };

    const handleSelect = (value: string) => {
        if (value) {
            useFilter({field: field, value: value});
            setValue(value);
        }
    };

    const handleClear = () => {
        setValue("");
        removeFilter({field: field});
    };

    const searchRequest = useDebounce(() => {
        useFilter({field: field, value: value});
    });

    useEffect(() => {
        const filter = filters.find(f => f.field === field);
        setValue(filter?.value || "");
    }, [filters.find(f => f.field === field)]);

    return (
        <Autocomplete
            autoFocus={autoFocus}
            size={"sm"}
            radius={"md"}
            variant={"filled"}
            className={"filter-input"}
            value={value}
            placeholder={t(`tune.${field}`)}
            onChange={handleSearch}
            onOptionSubmit={handleSelect}
            rightSectionPointerEvents="all"
            rightSection={<ClearIcon show={!!value} onClick={handleClear}/>}
            data={filteringOptions[field]?.[1]?.items || []}
        />
    );
}

export default FilterInput;
