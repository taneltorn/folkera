import React, {useState} from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Group, Pill} from "@mantine/core";
import {Color} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";

const MAX_NUMBER_OF_FILTERS_TO_DISPLAY = 6;

const RecordingFilters: React.FC = () => {

    const {t} = useTranslation();
    const {filters, removeFilter} = useDataContext();

    const [showAllFilters, setShowAllFilters] = useState<boolean>(false);

    return (
        <Group gap={4}>
            {filters.slice(0, showAllFilters ? 100 : MAX_NUMBER_OF_FILTERS_TO_DISPLAY).map((filter, index) =>
                <Pill key={index}
                      size={"md"}
                      bg={`${Color.get(filter.field) || "gray"}.8`}
                      c={"white"}
                      withRemoveButton
                      removeButtonProps={{title: t("button.removeFilter")}}
                      onRemove={() => removeFilter(filter.field, filter.value)}>
                    {t(`recording.${filter.field}`)}: {filter.value}
                </Pill>)}

            {!showAllFilters && filters.length > MAX_NUMBER_OF_FILTERS_TO_DISPLAY &&
                <Pill onClick={() => setShowAllFilters(true)}>...</Pill>}
        </Group>
    );
}

export default RecordingFilters;
