import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import FilterSelect from "../table/components/FilterSelect.tsx";

const RecordingTableFiltersBar: React.FC = () => {

    const {t} = useTranslation();
    const {filteringOptions} = useDataFiltering();

    return (
        <Group my={"xs"} justify={"start"} style={{zIndex: 300}}>
            <FilterSelect
                field={"piece"}
                placeholder={t("recording.piece")}
                options={filteringOptions.piece}
            />
            <FilterSelect
                field={"year"}
                placeholder={t("recording.year")}
                options={filteringOptions.year}
            />
            <FilterSelect
                field={"instrument"}
                placeholder={t("recording.instrument")}
                options={filteringOptions.instrument}
            />
            <FilterSelect
                field={"performer"}
                placeholder={t("recording.performer")}
                options={filteringOptions.performer}
            />
            <FilterSelect
                field={"location"}
                placeholder={t("recording.location")}
                options={filteringOptions.location}/>
            <FilterSelect
                field={"collector"}
                placeholder={t("recording.collector")}
                options={filteringOptions.collector}
            />
        </Group>
    );
}

export default RecordingTableFiltersBar;
