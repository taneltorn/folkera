import React, {ReactNode} from "react";
import {Group, Table} from "@mantine/core";
import SortButton from "./controls/SortButton.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";

interface Properties {
    field: keyof Recording;
    sortField?: keyof Recording;
    children: ReactNode;
    colSpan?: number;
}

const RecordingTableHeader: React.FC<Properties> = ({field, sortField, colSpan, children}) => {

    const {hiddenFields} = useDataContext();

    return (
        <Table.Th hidden={hiddenFields.includes(field)} colSpan={colSpan || 1} >
            <Group justify={"start"} wrap={"nowrap"} gap={4}>
                <SortButton field={sortField || field}/>
                {children}
            </Group>
        </Table.Th>
    );
}

export default RecordingTableHeader;
