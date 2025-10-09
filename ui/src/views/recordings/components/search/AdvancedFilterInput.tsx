import React from "react";
import {Autocomplete, Button, Grid, Group, Input} from "@mantine/core";
import {useTranslation} from "react-i18next";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {LuFilterX} from "react-icons/lu";
import {Size} from "../../../../utils/constants.ts";
import {Recording} from "../../../../model/Recording.ts";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";

interface Properties {
    field: keyof Recording;
    autocomplete?: boolean;
    options?: string[];
}

const AdvancedFilterInput: React.FC<Properties> = ({field, autocomplete, options}) => {

    const {t} = useTranslation();

    const {filters, clearFilter, updateFilter} = useAdvancedFilteringContext();
    const {filteringOptions} = useDataContext();

    const filter = filters.find(f => f.field === field) || {field: field, value: "", type: "contains"};

    const handleTypeChange = (type: string) => {
        updateFilter(field, {
            ...filter,
            value: ["blank", "not_blank"].includes(type) ? type : filter.value,
            type: type
        });
    }

    return (
        <Grid>
            <Grid.Col span={{base: 6, lg: 4}}>
                {autocomplete
                    ? <Autocomplete
                        size={"sm"}
                        className={filter.value ? "active-input" : ""}
                        value={filter.value}
                        disabled={["blank", "not_blank"].includes(filter.type as string)}
                        placeholder={t(`recording.${field}`)}
                        onChange={(v) => updateFilter(field, {...filter, value: v})}
                        rightSectionPointerEvents="all"
                        data={options || filteringOptions[field]?.[1]?.items || []}
                    />
                    : <Input
                        size={"sm"}
                        className={filter.value ? "active-input" : ""}
                        value={filter.value}
                        disabled={["blank", "not_blank"].includes(filter.type as string)}
                        placeholder={t(`recording.${field}`)}
                        onChange={(e) => updateFilter(field, {...filter, value: e.currentTarget.value})}
                        rightSectionPointerEvents="all"
                    />}
            </Grid.Col>

            <Grid.Col span={{base: 6, lg: 3}}>
                <Group wrap={"nowrap"}>
                    <MenuSelect
                        color={"dark.9"}
                        variant={"light"}
                        size={"sm"}
                        label={t(`filtering.${filter.type}`)}
                        options={[
                            {value: "contains", label: t("filtering.contains")},
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
                        onClick={() => clearFilter(field)}
                        style={{display: filters.find(f => f.field === filter.field) ? undefined : 'none'}}
                    >
                        <LuFilterX size={Size.icon.SM}/>
                    </Button>
                </Group>
            </Grid.Col>
        </Grid>
    );
}

export default AdvancedFilterInput;
