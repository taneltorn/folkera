import React from "react";
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

const AdvancedFilteringPanel: React.FC = () => {

    const {t} = useTranslation();
    const {filters, setFilters, setVisible} = useAdvancedFilteringContext();
    const ctx = useDataContext();

    const handleSubmit = () => {
        const filterList: Filter[] = [];
        
        filters.forEach(f => {
            if (f.value?.includes(";")) {
                const values = f.value.split(";").map(v => v.trim()).filter(v => v);
                values.forEach(v => {
                    filterList.push({...f, value: v});
                });
            } else {
                filterList.push({...f});
            }
        });

        ctx.loadData(filterList);

        handleClear();
        setVisible(false);
    }

    const handleClear = () => {
        setFilters([]);
    }

    const handleClose = () => {
        setVisible(false);
        handleClear();
    }

    return (
        <Box mb={"xl"}>
            <Title order={5} mb={"sm"}>
                {t("filtering.advanced.title")}
            </Title>
            
            <Text fs={"italic"} mb={"md"} size={"sm"}>
                {t("filtering.advanced.hint")}
            </Text>

            <Stack gap={"xs"}>
                <AdvancedFilterInput field={"ref"}/>
                <AdvancedFilterInput field={"content"}/>

                <AdvancedYearInput/>

                <AdvancedFilterInput field={"melody"} autocomplete/>
                <AdvancedFilterInput field={"dance"} autocomplete/>
                <AdvancedFilterInput field={"instrument"} autocomplete/>
                <AdvancedFilterInput field={"performer"} autocomplete/>
                <AdvancedFilterInput field={"collector"} autocomplete/>
                <AdvancedFilterInput field={"parish"} autocomplete/>
                <AdvancedFilterInput field={"county"} autocomplete/>
                <AdvancedFilterInput field={"origin"} autocomplete/>
                <AdvancedFilterInput field={"audio"}/>
            </Stack>

            <Group mt={"md"} gap={4}>
                <Button
                    onClick={handleSubmit}
                    leftSection={<IoSearchOutline size={Size.icon.MD}/>}
                >
                    {t("button.search")}
                </Button>

                {filters.length && <Button
                    color={"dark"}
                    variant={"light"}
                    leftSection={<RxReset size={Size.icon.SM}/>}
                    onClick={handleClear}
                >
                    {t("button.reset")}
                </Button>}

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
}

export default AdvancedFilteringPanel;
