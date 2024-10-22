import React, {useEffect, useState} from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Button, CloseButton, Group, Input, Pill} from "@mantine/core";
import {FaFileExport, FaSave} from "react-icons/fa";
import {Size} from "../../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import {IoSearchOutline} from "react-icons/io5";
import useDebounce from "../../../hooks/useDebounce.ts";
import {useFocusWithin} from "@mantine/hooks";
import {useDataService} from "../../../hooks/useDataService.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";
import {DisplayError} from "../../../utils/common.helpers.tsx";

const MAX_NUMBER_OF_FILTERS_TO_DISPLAY = 8;

const RecordingTableControls: React.FC = () => {

    const {t} = useTranslation();
    const [value, setValue] = useState<string>("");
    const {ref} = useFocusWithin();
    const {
        filters,
        clearFilters,
        addFilter,
        removeFilter,
    } = useDataFiltering();

    const {exportData, saveData} = useDataService();
    const {modifications, clearModifications} = useModifications();
    const {notify} = useNotifications();

    const handleSave = () => {
        saveData(modifications)
            .then(() => {
                notify(t("toast.success.saveData"), NotificationType.SUCCESS)
            })
            .catch(e => DisplayError(e, t("toast.error.saveData")));
        clearModifications();
    };

    const handleSearch = (value: string) => {
        setValue(value);
        triggerSearch();
    };


    const triggerSearch = useDebounce(() => {
        addFilter("search", [value]);
    });

    useEffect(() => {
        const filter = filters.find(f => f.field === "search");
        setValue(filter?.value || "");
    }, [filters.find(f => f.field === "search")]);

    return (
        <Group px={"md"} justify={"space-between"} bg={"white"} mb={"xs"}>
            <Group>
                <Input
                    ref={ref}
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

                <Group gap={4}>
                    {filters.slice(0, MAX_NUMBER_OF_FILTERS_TO_DISPLAY).map((filter, index) =>
                        <Pill key={index}
                              size={"md"}
                              withRemoveButton
                              onRemove={() => removeFilter(filter.field, filter.value)}>
                            {filter.value}
                        </Pill>)}

                    {filters.length > MAX_NUMBER_OF_FILTERS_TO_DISPLAY && <Pill>...</Pill>}
                </Group>
            </Group>

            <Group gap={4}>
                {!!filters.length &&
                    <Button
                        variant={"subtle"}
                        size={"xs"}
                        color={"dark"}
                        leftSection={<LuFilterX size={Size.icon.SM}/>}
                        onClick={clearFilters}>
                        {t("view.recordings.controls.clearFilters")}
                    </Button>}

                {modifications.length > 0 &&
                    <Button
                        variant={"subtle"}
                        size={"xs"}
                        color={"dark"}
                        leftSection={<FaSave size={Size.icon.SM}/>}
                        onClick={handleSave}>
                        {t("view.recordings.controls.save")}
                    </Button>}

                <Button
                    variant={"subtle"}
                    size={"xs"}
                    color={"dark"}
                    leftSection={<FaFileExport size={Size.icon.SM}/>}
                    onClick={exportData} px={"xs"} mx={0}>
                    {t("view.recordings.controls.export")}
                </Button>
            </Group>
        </Group>
    );
}

export default RecordingTableControls;
