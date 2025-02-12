import React from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import { Group, Pill} from "@mantine/core";
import {Color} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";

const MAX_NUMBER_OF_FILTERS_TO_DISPLAY = 8;

const RecordingFilters: React.FC = () => {

    const {t} = useTranslation();
    const {filters, removeFilter} = useDataContext();

    return (
        <Group gap={4}>
            {filters.slice(0, MAX_NUMBER_OF_FILTERS_TO_DISPLAY).map((filter, index) =>
                <Pill key={index}
                      size={"md"}
                      bg={`${Color.get(filter.field) || "gray"}.8`}
                      c={"white"}
                      withRemoveButton
                      removeButtonProps={{title: t("button.removeFilter")}}
                      onRemove={() => removeFilter(filter.field, filter.value)}>
                    {t(`recording.${filter.field}`)}: {filter.value}
                </Pill>)}

            {filters.length > MAX_NUMBER_OF_FILTERS_TO_DISPLAY && <Pill>...</Pill>}
        </Group>
    );
}

export default RecordingFilters;
