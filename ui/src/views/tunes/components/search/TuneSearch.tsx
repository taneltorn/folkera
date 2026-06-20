import React, {useEffect, useState} from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {CloseButton, Input} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {IoSearchOutline} from "react-icons/io5";
import useDebounce from "../../../../hooks/useDebounce.ts";
import {useFocusWithin} from "@mantine/hooks";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const TuneSearch: React.FC = () => {

    const {t} = useTranslation();
    const {ref, focused} = useFocusWithin();
    const {useFilter, removeFilter, filters} = useDataContext();
    const bp = useCurrentBreakpoint();

    const [value, setValue] = useState<string>("");

    const handleSearch = (value: string) => {
        setValue(value);
        triggerSearch();
    };

    const triggerSearch = useDebounce(() => {
        if (value) {
            useFilter({field: "search", value: value});
            return;
        }
        removeFilter({field: "search"});
    });

    useEffect(() => {
        if (value && filters.length === 0) {
            setValue("");
        }
    }, [filters]);

    return (
        <Input
            ref={ref}
            radius={"lg"}
            w={bp === "xxs" ? "100%" : (focused || value ? 320 : 220)}
            size={"md"}
            value={value}
            id={focused ? "search-input-focused" : ""}
            className={"search-input"}
            leftSection={<IoSearchOutline size={Size.icon.MD}/>}
            placeholder={t("page.tunes.controls.search")}
            onChange={e => handleSearch(e.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
                <CloseButton
                    variant={"transparent"}
                    onClick={() => handleSearch("")}
                    style={{display: value ? undefined : 'none'}}
                />
            }
        />
    );
}

export default TuneSearch;
