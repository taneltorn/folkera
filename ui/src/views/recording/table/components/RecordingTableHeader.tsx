import React, {useState} from "react";
import {Autocomplete, CloseButton, Text} from "@mantine/core";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import RecordingTableHeaderWrapper from "./RecordingTableHeaderWrapper.tsx";
import useDebounce from "../../../../hooks/useDebounce.ts";
import {Recording} from "../../../../../../domain/Recording.ts";
import {useTranslation} from "react-i18next";

interface Properties {
    field: keyof Recording;
    sortField?: keyof Recording;
    placeholder?: string;
    options?: any[];
}

const RecordingTableHeader: React.FC<Properties> = ({field, sortField, placeholder, options}) => {

    const {t} = useTranslation();
    const [value, setValue] = useState<string>("");
    const { addFilter, removeFilter} = useDataFiltering();

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

    return (
        <RecordingTableHeaderWrapper field={field} sortField={sortField}>
            <Text ms={"xs"} size={"sm"} fw={"bold"}>{t(`recording.${field}`)}</Text>
            {/*<Autocomplete*/}
            {/*    value={value}*/}
            {/*    placeholder={placeholder}*/}
            {/*    onChange={handleSearch}*/}
            {/*    data={options}*/}
            {/*    rightSectionPointerEvents="all"*/}
            {/*    rightSection={*/}
            {/*        <CloseButton*/}
            {/*            size={"xs"}*/}
            {/*            className={"hover-pointer"}*/}
            {/*            onClick={handleClear}*/}
            {/*            style={{display: value ? undefined : 'none'}}*/}
            {/*        />*/}
            {/*    }*/}
            {/*/>*/}
        </RecordingTableHeaderWrapper>
    );
}

export default RecordingTableHeader;
