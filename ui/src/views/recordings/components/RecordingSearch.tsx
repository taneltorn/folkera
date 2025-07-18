import React, {useEffect, useState} from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {CloseButton, Input} from "@mantine/core";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {IoSearchOutline} from "react-icons/io5";
import useDebounce from "../../../hooks/useDebounce.ts";
import {useFocusWithin} from "@mantine/hooks";

const RecordingSearch: React.FC = () => {

    const {t} = useTranslation();
    const {ref} = useFocusWithin();
    const {addFilter, filters} = useDataContext();

    const [value, setValue] = useState<string>("");

    const handleSearch = (value: string) => {
        setValue(value);
        triggerSearch();
    };

    const triggerSearch = useDebounce(() => {
        addFilter("search", [value]);
    });

    useEffect(() => {
        if (value && filters.length === 0 ) {
            setValue("");            
        }
    }, [filters]);

    return (
        <Input
            ref={ref}
            w={{base: 150, xs: 300}}
            size={"md"}
            value={value}
            leftSection={<IoSearchOutline size={Size.icon.MD}/>}
            placeholder={t("view.recordings.controls.search")}
            onChange={e => handleSearch(e.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
                <CloseButton
                    size={"md"}
                    className={"hover-pointer"}
                    onClick={() => handleSearch("")}
                    style={{display: value ? undefined : 'none'}}
                />
            }
        />
    );
}

export default RecordingSearch;
