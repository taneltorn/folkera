import React from "react";
import {Button, Group, Pagination, Text, useMantineTheme} from "@mantine/core";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import {ItemsPerPageOptions} from "../../../../utils/common.lists.ts";
import {useTranslation} from "react-i18next";

interface Properties {
    totalItems: number;
}

const RecordingTablePagination: React.FC<Properties> = ({totalItems}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();

    const {activePage, setActivePage, itemsPerPage, setItemsPerPage} = useDataFiltering();

    return (
        <Group mt={"md"} px={"md"} justify={"space-between"}>
            <Group gap={4}>
                {ItemsPerPageOptions.map(it => (
                    <Button
                        key={it}
                        size={"xs"}
                        color={theme.primaryColor}
                        visibleFrom={"md"}
                        variant={it === itemsPerPage ? "filled" : "default"}
                        onClick={() => {
                            setActivePage(1);
                            setItemsPerPage(it);
                        }}
                    >
                        {it}
                    </Button>))}
                <Text ml={"md"}>
                    {t("page.table.totalItems", {count: totalItems})}
                </Text>
            </Group>

            <Pagination
                value={activePage}
                total={Math.ceil(totalItems / itemsPerPage)}
                onChange={setActivePage}
            />
        </Group>
    );
}

export default RecordingTablePagination;
