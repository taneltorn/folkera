import React, {useState} from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button, Group, Pill} from "@mantine/core";
import {Color, Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";

const MAX_NUMBER_OF_FILTERS_TO_DISPLAY = 6;

const RecordingFilters: React.FC = () => {

    const {t} = useTranslation();
    const {filters, removeFilter, clearFilters} = useDataContext();

    const [showAllFilters, setShowAllFilters] = useState<boolean>(false);

    return (<>
            {!!filters.length &&
                <Group gap={4}>
                    {filters
                        .slice(0, showAllFilters ? 100 : MAX_NUMBER_OF_FILTERS_TO_DISPLAY)
                        .map((filter, index) =>
                            <Pill
                                key={index}
                                size={"md"}
                                bg={`${Color.get(filter.field) || "gray"}.8`}
                                c={"white"}
                                withRemoveButton
                                removeButtonProps={{title: t("button.removeFilter")}}
                                onRemove={() => removeFilter({
                                    field: filter.field,
                                    value: filter.value,
                                    type: filter.type
                                })}
                            >
                                {t(`recording.${filter.field}`)}{
                                filter.type === "exact"
                                    ? t(`view.recordings.exactMatch`)
                                    : ""}: {filter.value}
                            </Pill>)}

                    {!showAllFilters && filters.length > MAX_NUMBER_OF_FILTERS_TO_DISPLAY &&
                        <Pill onClick={() => setShowAllFilters(true)}>...</Pill>}

                    <Button
                        variant={"subtle"}
                        title={t("view.recordings.controls.clearFilters")}
                        size={"compact-sm"}
                        color={"dark"}
                        onClick={clearFilters}>
                        <LuFilterX size={Size.icon.SM}/>
                    </Button>
                </Group>}
        </>
    );
}

export default RecordingFilters;
