import React, {useRef} from "react";
import {Box, Button, Divider, Group, Stack, Text} from "@mantine/core";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useTranslation} from "react-i18next";
import {Size} from "../../../../utils/constants.ts";
import {IoAddOutline, IoSearchOutline} from "react-icons/io5";
import AdvancedYearInput from "./AdvancedYearInput.tsx";
import {Filter} from "../../../../model/Filter.ts";
import AdvancedFilter from "./AdvancedFilter.tsx";
import AdvancedFilterDynamic from "./AdvancedFilterDynamic.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {AutocompleteFields} from "../../../../utils/fields.ts";
import {RiResetLeftLine} from "react-icons/ri";

const AdvancedFilteringPanel: React.FC = () => {

    const {t} = useTranslation();
    const {filters, setFilters, setVisible, dynamicRows, setDynamicRows} = useAdvancedFilteringContext();
    const ctx = useDataContext();

    const seq = useRef(0);

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

    const handleSubmit = () => {
        const filterList: Filter[] = [];
        filters.forEach(f => {
            if (typeof f.value === "string" && f.value.includes(";")) {
                const values = f.value.split(";").map(v => v.trim()).filter(Boolean);
                values.forEach(v => filterList.push({...f, value: v}));
            } else {
                filterList.push({...f});
            }
        });

        ctx.loadData(filterList);

        handleClear();
        setVisible(false);
    };

    const handleClear = () => {
        setFilters([]);
        setDynamicRows([]);
        seq.current = 0;
    };

    return (
        <Box mt={"md"} mb={"xl"}>
            <Text mb={"md"} fw={600} size={"sm"}>
                {t("filtering.advanced.hint")}
            </Text>

            <Stack gap={"xs"}>
                <AdvancedFilter filterKey={"ref"} field={"ref"}/>
                <AdvancedFilter filterKey={"content"} field={"content"}/>
                <AdvancedYearInput filterKey={"year"}/>
                <AdvancedFilter filterKey={"melody"} field={"melody"}/>
                <AdvancedFilter filterKey={"performer"} field={"performer"}/>
                <AdvancedFilter filterKey={"instrument"} field={"instrument"}/>
                <AdvancedFilter filterKey={"collector"} field={"collector"}/>
                <AdvancedFilter filterKey={"parish"} field={"parish"}/>
                <AdvancedFilter filterKey={"county"} field={"county"}/>
                <AdvancedFilter filterKey={"origin"} field={"origin"}/>

                {dynamicRows.length > 0 && <Divider my={"md"} color={"gray.1"}/>}

                {dynamicRows.map(row => (
                    <AdvancedFilterDynamic field={row.field} filterKey={row.filterKey} id={row.id}/>
                ))}
            </Stack>

            <Group mt={"md"}>
                <Button
                    radius={"xl"}
                    className={"hover-underline"}
                    variant="transparent"
                    aria-label={"add"}
                    leftSection={<IoAddOutline size={Size.icon.SM}/>}
                    onClick={() => addDynamicRow("instrument")}
                >
                    {t("button.addFilter")}
                </Button>
            </Group>
            <Group mt={"lg"} gap={4}>
                <Button
                    radius={"xl"}
                    onClick={handleSubmit}
                    leftSection={<IoSearchOutline size={Size.icon.MD}/>}
                >
                    {t("button.search")}
                </Button>

                <Button
                    radius={"xl"}
                    color={"gray"}
                    variant={"subtle"}
                    leftSection={<RiResetLeftLine size={Size.icon.SM}/>}
                    onClick={handleClear}
                >
                    {t("button.reset")}
                </Button>

            </Group>
        </Box>
    );
};

export default AdvancedFilteringPanel;