import React, {useState} from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button, Group, Pill} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import {generateFilterName} from "../../../../utils/helpers.tsx";

const MAX_NUMBER_OF_FILTERS_TO_DISPLAY = 6;
const MIN_NUMBER_OF_FILTERS_FOR_CLOSE_ALL = 1;

const TuneFilters: React.FC = () => {

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
                                bg={"dark.9"}
                                // bg={`${Color.get(filter.field) || "gray"}.8`}
                                c={"white"}
                                withRemoveButton
                                removeButtonProps={{title: t("button.removeFilter")}}
                                onRemove={() => removeFilter({
                                    field: filter.field,
                                    value: filter.value,
                                    type: filter.type
                                })}
                            >
                                {/*{filter.value}*/}
                                {generateFilterName(filter, t)}
                            </Pill>)}

                    {!showAllFilters && filters.length > MAX_NUMBER_OF_FILTERS_TO_DISPLAY &&
                        <Pill onClick={() => setShowAllFilters(true)}>...</Pill>}

                    {filters.length >= MIN_NUMBER_OF_FILTERS_FOR_CLOSE_ALL &&
                        <Button
                            variant={"subtle"}
                            title={t("page.tunes.controls.clearFilters")}
                            size={"compact-sm"}
                            radius={"xl"}
                            color={"dark.9"}
                            onClick={clearFilters}>
                            <LuFilterX size={Size.icon.SM}/>
                        </Button>}
                </Group>}
        </>
    );
}

export default TuneFilters;
