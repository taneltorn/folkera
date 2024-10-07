import React, {useEffect, useState} from "react";
import {Recording} from "../../../model/Recording.ts";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Button, CloseButton, Group, Input, Menu, Pill} from "@mantine/core";
import {FaEyeSlash, FaFileExport, FaMapMarkerAlt, FaRegEye, FaSave} from "react-icons/fa";
import {Size} from "../../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import {IoSearchOutline, IoStatsChartSharp} from "react-icons/io5";
import {RecordingTableFields} from "../../../utils/common.lists.ts";
import useDebounce from "../../../hooks/useDebounce.ts";
import {useFocusWithin} from "@mantine/hooks";
import {useDataService} from "../../../hooks/useDataService.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {NotificationType} from "../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../hooks/useNotifications.tsx";
import {DisplayError} from "../../../utils/common.helpers.tsx";
import {View} from "../../../context/DataFilteringContext.tsx";
import {FaTableList} from "react-icons/fa6";

const RecordingTableControls: React.FC = () => {

    const {t} = useTranslation();
    const [value, setValue] = useState<string>("");
    const {ref, focused} = useFocusWithin();
    const {
        filters,
        clearFilters,
        addFilter,
        removeFilter,
        hiddenFields,
        toggleField,
        view,
        setView,
        toggleView
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
                    // w={focused || value ? 600 : 400}
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

                {/*<Group gap={4}>*/}
                {/*    {filters.map((filter, index) =>*/}
                {/*        <Pill key={index}*/}
                {/*              size={"md"}*/}
                {/*              withRemoveButton*/}
                {/*              onRemove={() => removeFilter(filter.field, filter.value)}>*/}
                {/*            {filter.value}*/}
                {/*        </Pill>)}*/}
                {/*</Group>*/}
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

                {/*<Button*/}
                {/*    variant={"subtle"}*/}
                {/*    size={"xs"}*/}
                {/*    color={"dark"}*/}
                {/*    leftSection={view === View.TABLE ? <FaMapMarkerAlt size={Size.icon.SM}/> :*/}
                {/*        <FaTableList size={Size.icon.SM}/>}*/}
                {/*    onClick={toggleView} px={"xs"} mx={0}>*/}
                {/*    {t(`view.recordings.controls.${view === View.TABLE ? "mapView" : "tableView"}`)}*/}
                {/*</Button>*/}

                <Menu shadow="md" closeOnClickOutside={true} closeOnItemClick={false}>
                    <Menu.Target>
                        <Button
                            variant={"subtle"}
                            size={"xs"}
                            color={"dark"}
                            leftSection={<FaEyeSlash size={Size.icon.SM}/>}
                        >
                            {t("view.recordings.controls.visibleFields")}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {RecordingTableFields
                            .map((it, index) =>
                                <Menu.Item
                                    key={index}
                                    c={hiddenFields.includes(it as keyof Recording) ? "dark.1" : "dark.9"}
                                    leftSection={hiddenFields.includes(it as keyof Recording)
                                        ? <FaEyeSlash size={Size.icon.MD}/>
                                        : <FaRegEye size={Size.icon.MD}/>}
                                    onClick={() => toggleField(it as keyof Recording)}>
                                    {t(`recording.${it}`)}
                                </Menu.Item>)}
                    </Menu.Dropdown>
                </Menu>

                <Menu shadow="md" closeOnClickOutside={true}>
                    <Menu.Target>
                        <Button
                            variant={"subtle"}
                            size={"xs"}
                            color={"dark"}
                            leftSection={<FaTableList size={Size.icon.SM}/>}
                        >
                            {t("view.recordings.controls.tableView")}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>

                        <Menu.Item>
                            <Button
                                variant={view === View.TABLE ? "light": "subtle"}
                                color={"dark.9"}
                                size={"xs"}
                                leftSection={ <FaTableList size={Size.icon.SM}/>}
                                onClick={() => setView(View.TABLE)}>
                                {t(`view.recordings.controls.tableView`)}
                            </Button>
                        </Menu.Item>
                    <Menu.Item>

                        <Button
                            variant={view === View.MAP ? "light": "subtle"}
                            color={"dark.9"}
                            size={"xs"}
                            leftSection={<FaMapMarkerAlt size={Size.icon.SM}/>}
                            onClick={() => setView(View.MAP)}>
                            {t(`view.recordings.controls.mapView`)}

                        </Button>
                        </Menu.Item>
                            <Menu.Item>

                                <Button
                                    variant={view === View.STATS ? "light": "subtle"}
                                    color={"dark.9"}
                                    size={"xs"}
                                    leftSection={<IoStatsChartSharp size={Size.icon.SM}/>}

                                    onClick={() => setView(View.STATS)}>

                                    {t(`view.recordings.controls.statsView`)}
                                </Button>
                            </Menu.Item>

                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}

export default RecordingTableControls;
