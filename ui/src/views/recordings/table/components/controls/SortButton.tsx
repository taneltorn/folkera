import React from "react";
import {Button, Group, useMantineTheme} from "@mantine/core";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import {RiSortAsc, RiSortDesc} from "react-icons/ri";
import {Size} from "../../../../../utils/constants.ts";
import {Recording} from "../../../../../model/Recording.ts";
import {SortDirection} from "../../../../../model/Pagination.ts";
import {useTranslation} from "react-i18next";

interface Properties {
    field: keyof Recording;
}

const SortButton: React.FC<Properties> = ({field}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {pagination, setPagination} = useDataContext();

    return (
        <Group>
            <Button
                title={t("view.recordings.table.sort")}
                px={0}
                size={"compact-xs"}
                color={field === pagination?.sortField ? theme.primaryColor : theme.colors.dark[1]}
                variant={"transparent"}
                onClick={() => setPagination({
                    ...pagination,
                    sortField: field,
                    sortDirection: pagination?.sortField === field && pagination?.sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
                })}
            >
                {pagination?.sortField === field && pagination?.sortDirection === SortDirection.DESC
                    ? <RiSortAsc size={Size.icon.MD}/>
                    : <RiSortDesc size={Size.icon.MD}/>}
            </Button>
        </Group>
    );
}

export default SortButton;
