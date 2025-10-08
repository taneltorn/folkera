import React from "react";
import {Button, Grid, Select, useMantineTheme} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import {range} from "../../../../utils/helpers.tsx";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {Recording} from "../../../../model/Recording.ts";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    field: keyof Recording;
}

const AdvancedPeriodInput: React.FC<Properties> = ({field}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {filters, setFilters, clearFilter} = useAdvancedFilteringContext();

    const handleChange = (value: string, type: string) => {
        const filterList = filters.filter(f => f.field === field && f.type !== "exact" );
        filterList.push({field: field, value: value, type: type as "from" | "to" | "exact"});
        setFilters(filterList);
    };

    const options = ["", ...range(1912, 1999).map(v => `${v}`)];
    const period = options.map(y => ({value: y.toString(), label: y.toString()}));

    return (
        <Grid>
            <Grid.Col span={{base: 6, xs: 3, lg: 2}}>
                <Select
                    value={filters.find(f => f.field === field && f.type === "from")?.value
                        || filters.find(f => f.field === field && f.type === "exact")?.value || ""}
                    data={period}
                    placeholder={t("filtering.from")}
                    onChange={v => handleChange(v || "", "from")}
                    clearButtonProps={{
                        // @ts-ignore
                        icon: <LuFilterX color={theme.colors.red[9]}/>
                    }}
                />
            </Grid.Col>

            <Grid.Col span={{base: 6, xs: 3, lg: 2}}>
                <Select
                    value={filters.find(f => f.field === field && f.type === "to")?.value || filters.find(f => f.field === field && f.type === "exact")?.value || ""}
                    placeholder={t("filtering.to")}
                    data={period}
                    onChange={v => handleChange(v || "", "to")}
                    clearButtonProps={{
                        // @ts-ignore
                        icon: <LuFilterX color={theme.colors.red[9]}/>
                    }}

                />
            </Grid.Col>

            <Grid.Col span={{base: 2, xs: 1}} visibleFrom={"xs"}>
                <Button
                    variant={"subtle"}
                    onClick={() => clearFilter(field)}
                    style={{display: filters.find(f => f.field === field) ? undefined : 'none'}}
                >
                    <LuFilterX
                        size={Size.icon.SM}
                    />
                </Button>
            </Grid.Col>
        </Grid>
    );
}

export default AdvancedPeriodInput;
