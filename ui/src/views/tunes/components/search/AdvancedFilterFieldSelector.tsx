import React from "react";
import {Select} from "@mantine/core";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {AutocompleteFields, DynamicFieldTypes} from "../../../../utils/fields.ts";

interface Properties {
    filterKey: string;
    field: keyof Tune;
}

const AdvancedTypeFieldSelector: React.FC<Properties> = ({filterKey, field}) => {

    const {t} = useTranslation();
    const {dynamicRows, setDynamicRows} = useAdvancedFilteringContext();

    const fieldOptions = DynamicFieldTypes.map(f => ({value: f, label: t(`tune.${f}`)}));

    const updateDynamicRowField = (filterKey: string, nextField: keyof Tune) => {
        const rows = [...dynamicRows];

        const index = rows.findIndex(r => r.filterKey === filterKey);
        if (index === -1) return;

        rows[index] = {
            ...rows[index],
            field: nextField,
            autocomplete: AutocompleteFields.includes(nextField),
        };

        setDynamicRows(rows);
    };

    return (
        <Select
            variant={"filled"}
            title={t(`tune.${field}`)}
            data={fieldOptions as any}
            value={field}
            onChange={(v) => v && updateDynamicRowField(filterKey, v as keyof Tune)}
            searchable
        />
    );
};

export default AdvancedTypeFieldSelector;