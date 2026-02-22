import React from "react";
import {Group, Table} from "@mantine/core";
import SortButton from "./controls/SortButton.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Tune} from "../../../../model/Tune.ts";
import DragHandleButton from "./controls/DragHandleButton.tsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Properties {
    field: keyof Tune;
    sortField?: keyof Tune;
    colSpan?: number;
    children: React.ReactNode;
}

const TunesTableHeader: React.FC<Properties> = ({field, sortField, colSpan, children}) => {

    const {visibleFields} = useDataContext();
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: field});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Table.Th
            hidden={!visibleFields.includes(field)}
            colSpan={colSpan || 1}
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <Group wrap="nowrap" gap={4} justify={"space-between"}>
                <Group wrap={"nowrap"} w={"100%"} gap={4}>
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

export default TunesTableHeader;
