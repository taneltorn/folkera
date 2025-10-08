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
    const dataContext = useDataContext();

    const handleSubmit = () => {
        dataContext.loadData(filters);
    }

    const handleClear = () => {
        setFilters([]);
    }

    useEffect(() => {
        setFilters(dataContext.filters);
    }, [dataContext.filters]);

    return (
        <Box mb={"xl"}>
            <Title order={5} mb={"sm"}>
                {t("filtering.advanced.title")}
            </Title>

            <Stack gap={"xs"}>
                <AdvancedFilterInput field={"ref"}/>
                <AdvancedFilterInput field={"content"}/>
                <AdvancedPeriodInput field={"year"}/>
                <AdvancedFilterInput field={"tune"}/>
                <AdvancedFilterInput field={"dance"}/>
                <AdvancedFilterInput field={"instrument"}/>
                <AdvancedFilterInput field={"performer"}/>
                <AdvancedFilterInput field={"collector"}/>
                <AdvancedFilterInput field={"parish"}/>
                <AdvancedFilterInput field={"county"}/>
                <AdvancedFilterInput field={"origin"}/>
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
