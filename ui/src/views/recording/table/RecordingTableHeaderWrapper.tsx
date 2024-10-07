import React, {ReactNode} from "react";
import {Group, Table} from "@mantine/core";
import SortButton from "./SortButton.tsx";
import {Recording} from "../../../model/Recording.ts";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";

interface Properties {
    field: keyof Recording;
    sortField?: keyof Recording;
    children: ReactNode;
}

const RecordingTableHeaderWrapper: React.FC<Properties> = ({field, sortField, children}) => {

    const {hiddenFields} = useDataFiltering();

    return (
        <Table.Th hidden={hiddenFields.includes(field)}>
            <Group justify={"start"} wrap={"nowrap"} gap={4}>
                <SortButton field={sortField || field}/>
                {children}
            </Group>
        </Table.Th>
    );
}

export default RecordingTableHeaderWrapper;
