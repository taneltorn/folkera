import React, {useRef} from "react";
import {Box, Button, Divider, Group, Stack, Text, Title} from "@mantine/core";
import AdvancedFilterInput from "./AdvancedFilterInput.tsx";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useTranslation} from "react-i18next";
import {RxReset} from "react-icons/rx";
import {Size} from "../../../../utils/constants.ts";
import {IoSearchOutline} from "react-icons/io5";
import AdvancedYearInput from "./AdvancedYearInput.tsx";
import {Filter} from "../../../../model/Filter.ts";
import DynamicRowsPanel from "./DynamicRowsPanel.tsx";

const AdvancedFilteringPanel: React.FC = () => {

    const {t} = useTranslation();
    const {filters, setFilters, setVisible, dynamicRows, setDynamicRows} = useAdvancedFilteringContext();
    const ctx = useDataContext();

    const seq = useRef(0);

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

    const handleClose = () => {
        setVisible(false);
        handleClear();
    };

    return (
        <Box mb={"xl"}>
            <Title order={5} mb={"sm"}>
                {t("filtering.advanced.title")}
            </Title>

            <Text fs={"italic"} mb={"md"} size={"sm"}>
                {t("filtering.advanced.hint")}
            </Text>

            <Stack gap={"xs"}>
                <AdvancedFilterInput filterKey={"ref"} field={"ref"}/>
                <AdvancedFilterInput filterKey={"content"} field={"content"}/>
                <AdvancedYearInput filterKey={"year"}/>

                <AdvancedFilterInput filterKey={"melody"} field={"melody"} autocomplete/>
                <AdvancedFilterInput filterKey={"performer"} field={"performer"} autocomplete/>
                <AdvancedFilterInput filterKey={"instrument"} field={"instrument"} autocomplete/>
                <AdvancedFilterInput filterKey={"collector"} field={"collector"} autocomplete/>
                <AdvancedFilterInput filterKey={"parish"} field={"parish"} autocomplete/>
                <AdvancedFilterInput filterKey={"county"} field={"county"} autocomplete/>
                <AdvancedFilterInput filterKey={"origin"} field={"origin"} autocomplete/>

                <Divider my="xs"/>
                <DynamicRowsPanel/>
            </Stack>

            <Group mt={"md"} gap={4}>
                <Button
                    onClick={handleSubmit}
                    leftSection={<IoSearchOutline size={Size.icon.MD}/>}
                >
                    {t("button.search")}
                </Button>

                {(!!filters.length || dynamicRows.length > 0) && (
                    <Button
                        color={"dark"}
                        variant={"light"}
                        leftSection={<RxReset size={Size.icon.SM}/>}
                        onClick={handleClear}
                    >
                        {t("button.reset")}
                    </Button>
                )}

                <Button
                    color={"dark"}
                    variant={"subtle"}
                    onClick={handleClose}
                >
                    {t("button.close")}
                </Button>
            </Group>

            <Divider my={"md"}/>
        </Box>
    );
};

export default AdvancedFilteringPanel;