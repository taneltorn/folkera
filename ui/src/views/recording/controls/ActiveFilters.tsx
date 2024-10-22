import React from "react";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import {Group, Pill} from "@mantine/core";

const ActiveFilters: React.FC = () => {

    const {filters, removeFilter,} = useDataFiltering();

    return (
        <Group gap={4}>
            {filters.map((filter, index) =>
                <Pill key={index}
                      size={"md"}
                      withRemoveButton
                      onRemove={() => removeFilter(filter.field, filter.value)}>
                    {filter.value}
                </Pill>)}
        </Group>
    );
}

export default ActiveFilters;
