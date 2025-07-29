import React from "react";
import {Group, ScrollArea, Table} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import RecordingsTableRow from "./RecordingsTableRow.tsx";
import RecordingsTablePagination from "./RecordingsTablePagination.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {Recording} from "../../../../model/Recording.ts";
import {IoIosMusicalNotes} from "react-icons/io";
import {Size} from "../../../../utils/constants.ts";
import {useTableOrder} from "../../../../hooks/useTableOrder.ts";
import DraggableHeaderWrapper from "./DraggableHeaderWrapper.tsx";
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";

interface Properties {
    data: Recording[];
}

const RecordingsTable: React.FC<Properties> = ({data}) => {

    const {isLoading} = useDataContext();
    const {modifications} = useModifications();
    const {sortedFields, order, setOrder} = useTableOrder();

    return (
        <>
            <ScrollArea pb={"xs"}>
                <Table highlightOnHover stickyHeader={true}
                       opacity={(modifications.length || isLoading) ? 0.8 : 1}>

                    <Table.Thead>

                        <Table.Tr>
                            <Table.Th>
                                <Group justify={"center"}>
                                    <IoIosMusicalNotes size={Size.icon.SM}/>
                                </Group>
                            </Table.Th>

                            <DndContext
                                sensors={useSensors(useSensor(PointerSensor))}
                                collisionDetection={closestCenter}
                                onDragEnd={(event: DragEndEvent) => {
                                    const {active, over} = event;
                                    if (over && active.id !== over.id) {
                                        const oldIndex = order.indexOf(active.id as keyof Recording);
                                        const newIndex = order.indexOf(over.id as keyof Recording);
                                        setOrder(arrayMove(order, oldIndex, newIndex));
                                    }
                                }}
                            >
                                <SortableContext
                                    items={sortedFields.map(f => f.field)}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {sortedFields.map((tf, i) => (
                                        <DraggableHeaderWrapper
                                            key={`header-${tf.field}-${i}`}
                                            field={tf.field}
                                            type={tf.type}
                                            sortField={tf.sortField}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.map((row, index) =>
                            <RecordingsTableRow
                                key={`row-${index}`}
                                recording={row}
                                sortedFields={sortedFields}
                            />)}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            <RecordingsTablePagination/>
        </>
    );
}

export default RecordingsTable;
