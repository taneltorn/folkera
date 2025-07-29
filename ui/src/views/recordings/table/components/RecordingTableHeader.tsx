import React from "react";
import {Group, Table} from "@mantine/core";
import SortButton from "./controls/SortButton.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Recording} from "../../../../model/Recording.ts";
import DragHandleButton from "./controls/DragHandleButton.tsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Properties {
    field: keyof Recording;
    sortField?: keyof Recording;
    colSpan?: number;
    children: React.ReactNode;
}

const RecordingTableHeader: React.FC<Properties> = ({field, sortField, colSpan, children}) => {

    const {hiddenFields} = useDataContext();
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: field});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Table.Th
            hidden={hiddenFields.includes(field)}
            colSpan={colSpan || 1}
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <Group wrap="nowrap" gap={4} justify={"space-between"}>
                <Group wrap={"nowrap"} w={"100%"}>
                    <SortButton field={sortField || field}/>
                    {children}
                </Group>
                <div {...listeners}>
                    <DragHandleButton/>
                </div>
            </Group>
        </Table.Th>
    );
};

export default RecordingTableHeader;
