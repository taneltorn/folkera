import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Button, Group, Pill, Text} from "@mantine/core";
import {Trans, useTranslation} from "react-i18next";
import {View} from "../../../context/DataFilteringContext.tsx";
import {FaMapMarkerAlt} from "react-icons/fa";
import {Size} from "../../../utils/common.constants.ts";
import {FaTableList} from "react-icons/fa6";
import {IoStatsChartSharp} from "react-icons/io5";

const RecordingTableFiltersBar: React.FC = () => {

    const {t} = useTranslation();
    const {filters, removeFilter, clearFilters, filteredData, view, setView, toggleView} = useDataFiltering();

    return (
        <Group px={"md"} my={"xs"} justify={"space-between"} >

            <Group>

                <Text size={"sm"}>
                    <Trans
                        i18nKey="view.recordings.table.results"
                        values={{count: filteredData.length}}
                    />
                </Text>
                <Group gap={4}>
                    {filters.map((filter, index) =>
                        <Pill key={index}
                              size={"md"}
                              withRemoveButton
                              onRemove={() => removeFilter(filter.field, filter.value)}>
                            {filter.value}
                        </Pill>)}
                </Group>
            </Group>


            <Group gap={2}>
                <Button
                    variant={view === View.TABLE ? "light": "subtle"}
                    color={"dark.9"}
                    size={"xs"}
                    onClick={() => setView(View.TABLE)}>
                    <FaTableList size={Size.icon.SM}/>
                    {/*{t(`view.recordings.controls.tableView`)}*/}
                </Button>
                <Button
                    variant={view === View.MAP ? "light": "subtle"}
                    color={"dark.9"}
                    size={"xs"}
                    onClick={() => setView(View.MAP)}>
                    <FaMapMarkerAlt size={Size.icon.SM}/>
                </Button>
                <Button
                    variant={view === View.STATS ? "light": "subtle"}
                    color={"dark.9"}
                    size={"xs"}
                    onClick={() => setView(View.STATS)}>
                    <IoStatsChartSharp size={Size.icon.SM}/>
                    {/*{t(`view.recordings.controls.statsView`)}*/}
                </Button>

            </Group>


            {/*<Button*/}
            {/*    variant={"subtle"}*/}
            {/*    size={"xs"}*/}
            {/*    color={"dark"}*/}
            {/*    leftSection={view === View.TABLE ? <FaMapMarkerAlt size={Size.icon.SM}/> :*/}
            {/*        <FaTableList size={Size.icon.SM}/>}*/}
            {/*    onClick={toggleView} px={"xs"} mx={0}>*/}
            {/*    {t(`view.recordings.controls.${view === View.TABLE ? "mapView" : "tableView"}`)}*/}
            {/*</Button>*/}

            {/*<Button*/}
            {/*    variant={"subtle"}*/}
            {/*    size={"xs"}*/}
            {/*    color={"dark"}*/}
            {/*    onClick={() => setView(View.STATS)} px={"xs"} mx={0}>*/}
            {/*    Statistika*/}
            {/*</Button>*/}

                {/*<Button*/}
                {/*    variant={"subtle"}*/}
                {/*    size={"xs"}*/}
                {/*    color={"dark"}*/}
                {/*    leftSection={view === View.TABLE ? <FaMapMarkerAlt size={Size.icon.SM}/> :*/}
                {/*        <FaTableList size={Size.icon.SM}/>}*/}
                {/*    onClick={toggleView} px={"xs"} mx={0}>*/}
                {/*    {t(`view.recordings.controls.${view === View.TABLE ? "mapView" : "tableView"}`)}*/}
                {/*</Button>*/}


                {/*<Group gap={4}>*/}
                {/*    {filters.map((filter, index) =>*/}
                {/*        <Pill key={index}*/}
                {/*              size={"md"}*/}
                {/*              withRemoveButton*/}
                {/*              onRemove={() => removeFilter(filter.field, filter.value)}>*/}
                {/*            {filter.value}*/}
                {/*        </Pill>)}*/}
                {/*</Group>*/}

            {/*{!!filters.length &&*/}
            {/*    <Button*/}
            {/*        variant={"subtle"}*/}
            {/*        size={"xs"}*/}
            {/*        color={"dark"}*/}
            {/*        leftSection={<LuFilterX size={Size.icon.SM}/>}*/}
            {/*        onClick={clearFilters}>*/}
            {/*        {t("view.recordings.controls.clearFilters")}*/}
            {/*    </Button>}*/}

        </Group>
    );
}

export default RecordingTableFiltersBar;
