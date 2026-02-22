import React, {useEffect, useState} from "react";
import {Button, Grid, Group, Input, RangeSlider, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {LuFilterX} from "react-icons/lu";
import {Size} from "../../../../utils/constants.ts";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import useDebounce from "../../../../hooks/useDebounce.ts";

interface Properties {
}

const DefaultRange = [1874, 1999];

const AdvancedYearInput: React.FC<Properties> = () => {

    const {t} = useTranslation();

    const {filters, clearFilter, updateFilter, setFilters} = useAdvancedFilteringContext();

    const yearFilter = filters.find(f => f.field === "year") || {field: "year", value: "", type: "contains"};

    const [year, setYear] = useState<string>();
    const [yearRange, setYearRange] = useState<[number, number]>(DefaultRange as [number, number]);

    const handleTypeChange = (type: string) => {
        updateFilter("year", {
            ...yearFilter,
            value: ["blank", "not_blank"].includes(type) ? type : yearFilter.value,
            type: type
        });
    }
    const handleInputChange = (value: string) => {
        setYear(value);
        setYearRange(DefaultRange as [number, number]);

        triggerUpdate();
    };

    const handleRangeChange = (values: [number, number]) => {
        setYear("");
        setYearRange([values[0], values[1]]);
        triggerUpdate();
    };

    const triggerUpdate = useDebounce(() => {
        const filterList = filters.filter(f => !["year", "from", "to"].includes(f.field));
        if (year) {
            filterList.push({field: "year", value: year, type: yearFilter.type});
        } else {
            filterList.push({field: "from", value: yearRange[0].toString()});
            filterList.push({field: "to", value: yearRange[1].toString()});
        }
        setFilters(filterList);
    });

    const handleClear = () => {
        clearFilter(["from", "to", "year"]);
        setYearRange(DefaultRange as [number, number]);
    };

    useEffect(() => {
        if (!filters.length) {
            setYearRange(DefaultRange as [number, number]);
        }
    }, [filters.find(f => f.field === "from" || f.field ==="to") ]);

    useEffect(() => {
        if (!filters.length) {
            setYear("");
        }
    }, [filters.find(f => f.field === "year") ]);
    
    return (<>
            <Grid>
                <Grid.Col span={{base: 6, lg: 4}}>
                    <Input
                        size={"sm"}
                        variant={"filled"}
                        className={year ? "active-input" : ""}
                        value={year}
                        disabled={["blank", "not_blank"].includes(yearFilter.type as string)}
                        placeholder={yearRange !== DefaultRange ? `${yearRange[0]} - ${yearRange[1]}` : t(`tune.year`)}
                        onChange={(e) => handleInputChange(e.currentTarget.value)}
                        rightSectionPointerEvents="all"
                    />
                </Grid.Col>

                <Grid.Col span={{base: 6, lg: 3}}>
                    <Group wrap={"nowrap"}>
                        <MenuSelect
                            color={"dark.9"}
                            variant={"light"}
                            size={"sm"}
                            label={t(`filtering.${yearFilter.type}`)}
                            options={[
                                {value: "contains", label: t("filtering.contains")},
                                {value: "contains_all", label: t("filtering.contains_all")},
                                {value: "not_contains", label: t("filtering.not_contains")},
                                {value: "exact", label: t("filtering.exact")},
                                {value: "not_blank", label: t("filtering.not_blank")},
                                {value: "blank", label: t("filtering.blank")},
                            ]}
                            onChange={v => handleTypeChange(v)}
                        />
                        <Button
                            px={"xs"}
                            visibleFrom={"xs"}
                            variant={"subtle"}
                            onClick={handleClear}
                            style={{display: filters.find(f => ["year", "from", "to"].includes(f.field)) ? undefined : 'none'}}
                        >
                            <LuFilterX size={Size.icon.SM}/>
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>

            <Text>
                {t("filtering.advanced.selectYearRange")}
            </Text>

            <Grid>
                <Grid.Col span={{base: 10, xs: 6, lg: 4}}>
                    <RangeSlider
                        min={DefaultRange[0]}
                        max={DefaultRange[1]}
                        minRange={0}
                        onChange={handleRangeChange}
                        value={[yearRange[0], yearRange[1]]}
                        step={1}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}

export default AdvancedYearInput;
