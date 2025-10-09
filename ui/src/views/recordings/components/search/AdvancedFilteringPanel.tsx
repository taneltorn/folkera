import React, {useEffect} from "react";
import {Box, Button, Divider, Group, Stack, Title} from "@mantine/core";
import AdvancedFilterInput from "./AdvancedFilterInput.tsx";
import AdvancedPeriodInput from "./AdvancedPeriodInput.tsx";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useTranslation} from "react-i18next";

const AdvancedFilteringPanel: React.FC = () => {

    const {t} = useTranslation();
    const {filters, setFilters} = useAdvancedFilteringContext();
    const ctx = useDataContext();

    const handleSubmit = () => {
        ctx.loadData(filters);
    }

    const handleClear = () => {
        setFilters([]);
    }

    useEffect(() => {
        setFilters(ctx.filters);
    }, [ctx.filters]);

    return (
        <Box mb={"xl"}>
            <Title order={5} mb={"sm"}>
                {t("filtering.advanced.title")}
            </Title>

            <Stack gap={"xs"}>
                <AdvancedFilterInput field={"ref"}/>
                <AdvancedFilterInput field={"content"}/>
                <AdvancedPeriodInput field={"year"}/>
                <AdvancedFilterInput field={"tune"} autocomplete/>
                <AdvancedFilterInput field={"dance"} autocomplete/>
                <AdvancedFilterInput field={"instrument"} autocomplete />
                <AdvancedFilterInput field={"performer"} autocomplete/>
                <AdvancedFilterInput field={"collector"} autocomplete/>
                <AdvancedFilterInput field={"parish"} autocomplete/>
                <AdvancedFilterInput field={"county"} autocomplete/>
                <AdvancedFilterInput field={"origin"} autocomplete/>
                <AdvancedFilterInput field={"archive"}/>
                <AdvancedFilterInput field={"file"}/>
            </Stack>

            <Group mt={"md"} gap={4}>
                <Button onClick={handleSubmit}>
                    {t("button.search")}
                </Button>
                {filters.length &&
                    <Button
                        color={"dark"}
                        variant={"subtle"}
                        onClick={handleClear}
                    >
                        {t("button.reset")}
                    </Button>}
            </Group>

            <Divider my={"md"}/>
        </Box>
    );
}

export default AdvancedFilteringPanel;
