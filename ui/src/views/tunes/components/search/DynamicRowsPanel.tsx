import React, {useRef} from "react";
import {Box, Group, Select} from "@mantine/core";
import AdvancedFilterInput from "./AdvancedFilterInput.tsx";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import AddButton from "../../../../components/buttons/AddButton.tsx";
import IconButton from "../../../../components/buttons/IconButton.tsx";

const DynamicFieldTypes = [
    "melody",
    "year",
    "instrument",
    "performer",
    "collector",
    "parish",
    "county",
    "origin",
    "dance",
    "audio",
    "notation",
    "musicxml",
];

const AutocompleteFields = ["melody", "dance", "instrument", "performer", "collector", "parish", "county", "origin"];

const DynamicRowsPanel: React.FC = () => {

    const {t} = useTranslation();
    const {setFilters, dynamicRows, setDynamicRows} = useAdvancedFilteringContext();

    const seq = useRef(0);

    const fieldOptions = DynamicFieldTypes.map(f => ({value: f, label: t(`tune.${f}`)}));

    const addDynamicRow = (field: keyof Tune = "instrument") => {
        seq.current += 1;
        const id = `row_${seq.current}`;
        const filterKey = `dyn_${seq.current}`;

        const rows = [...dynamicRows];
        rows.push({
            id,
            filterKey,
            field,
            autocomplete: AutocompleteFields.includes(field),
        });

        setDynamicRows(rows);
    };

    const updateDynamicRowField = (id: string, nextField: keyof Tune) => {
        const rows = [...dynamicRows];

        const index = rows.findIndex(r => r.id === id);
        if (index === -1) return;

        rows[index] = {
            ...rows[index],
            field: nextField,
            autocomplete: AutocompleteFields.includes(nextField),
        };

        setDynamicRows(rows);
    };

    const removeDynamicRow = (id: string) => {
        const rows = [...dynamicRows];
        const row = rows.find(r => r.id === id);
        if (!row) return;

        const nextRows = rows.filter(r => r.id !== id);
        setDynamicRows(nextRows);

        // @ts-ignore
        setFilters(prev => prev.filter(f => f.filterKey !== row.filterKey));
    };

    return (<>
            {dynamicRows.map(row => (
                <Group key={row.id} align="flex-end" gap="xs" wrap="nowrap">
                    <Select
                        w={150}
                        variant={"filled"}
                        title={t(`tune.${row.field}`)}
                        data={fieldOptions as any}
                        value={row.field}
                        onChange={(v) => v && updateDynamicRowField(row.id, v as keyof Tune)}
                        searchable
                    />

                    <Box style={{flex: 1}}>
                        <AdvancedFilterInput
                            filterKey={row.filterKey}
                            field={row.field}
                            autocomplete={row.autocomplete}
                        />
                    </Box>

                    <IconButton
                        type={"remove"}
                        onClick={() => removeDynamicRow(row.id)}
                    />

                </Group>
            ))}

            <AddButton
                label={t("button.addFilter")}
                onClick={() => addDynamicRow("instrument")}
            />
        </>
    );
};

export default DynamicRowsPanel;