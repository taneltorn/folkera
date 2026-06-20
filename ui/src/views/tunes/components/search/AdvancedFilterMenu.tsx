import React from "react";
import {useTranslation} from "react-i18next";
import SimpleMenu from "../../../../components/SimpleMenu.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {Filter} from "../../../../model/Filter.ts";

interface Properties {
    filterKey: string;
    field: keyof Tune;
}

const AdvancedFilterMenu: React.FC<Properties> = ({filterKey, field}) => {

    const {t} = useTranslation();

    const {filters, updateFilter} = useAdvancedFilteringContext();

    const filter: Filter = filters.find(f => f.filterKey === filterKey) || {
        filterKey: filterKey,
        field: field,
        value: "",
        type: "contains"
    };

    const handleTypeChange = (type: string) => {
        updateFilter(filterKey, {
            ...filter,
            value: ["blank", "not_blank"].includes(type) ? type : filter.value,
            type: type
        });
    }

    return (
        <SimpleMenu
            alwaysShowLabel
            variant={"transparent"}
            size={"sm"}
            label={t(`filtering.${filter.type}`)}
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
    );
}

export default AdvancedFilterMenu;
