import React, {useEffect} from "react";
import {Autocomplete} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import useDebounce from "../../../../hooks/useDebounce.ts";
import {Filter} from "../../../../model/Filter.ts";
import ClearIcon from "../../../../components/buttons/ClearIcon.tsx";

interface Properties {
    filterKey: string;
    field: keyof Tune;
    options?: string[];
}

const AdvancedFilterInput: React.FC<Properties> = ({filterKey, field, options}) => {

    const {t} = useTranslation();

    const {filters, clearFilter, updateFilter} = useAdvancedFilteringContext();
    const ctx = useDataContext();

    const [value, setValue] = React.useState<string>();

    const filter: Filter = filters.find(f => f.filterKey === filterKey) || {
        filterKey: filterKey,
        field: field,
        value: "",
        type: "contains"
    };

    const handleChange = (value: string) => {
        setValue(value);
        triggerUpdate();
    }

    const handleClear = () => {
        setValue("");
        clearFilter(field);
    }

    const triggerUpdate = useDebounce(() => {
        updateFilter(filterKey, {...filter, value: value});
    });

    useEffect(() => {
        if (!filters.length) {
            setValue("");
        }
    }, [filters.find(f => f.field === field)]);

    return (
        <Autocomplete
            size={"sm"}
            variant={"filled"}
            className={value ? "active-input" : ""}
            value={value}
            disabled={["blank", "not_blank"].includes(filter.type as string)}
            placeholder={t(`tune.${field}`)}
            onChange={handleChange}
            rightSectionPointerEvents="all"
            rightSection={<ClearIcon show={!!value} onClick={handleClear}/>}
            data={options || ctx.filteringOptions[field]?.[1]?.items || []}
        />
    );
}

export default AdvancedFilterInput;
