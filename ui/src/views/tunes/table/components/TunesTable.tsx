import React from "react";
import {ScrollArea, Table} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import TunesTablePagination from "./TunesTablePagination.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {useTableOrder} from "../../../../hooks/useTableOrder.ts";
import DraggableHeaderWrapper from "./DraggableHeaderWrapper.tsx";
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import TunesTableRow from "./TunesTableRow.tsx";
import DataTypeSelector from "./controls/DataTypeSelector.tsx";

interface Properties {
    data: Tune[];
}

const TunesTable: React.FC<Properties> = ({data}) => {

    const {isLoading} = useDataContext();
    const {modifications} = useModifications();
    const {sortedFields, order, setOrder} = useTableOrder();

    return (
        <>
            <ScrollArea pb={"xs"}>
                <Table
                    highlightOnHover
                    stickyHeader={true}
                    opacity={(modifications.length || isLoading) ? 0.8 : 1}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <DataTypeSelector/>
                            </Table.Th>

                            <DndContext
                                sensors={useSensors(useSensor(PointerSensor))}
                                collisionDetection={closestCenter}
                                onDragEnd={(event: DragEndEvent) => {
                                    const {active, over} = event;
                                    if (over && active.id !== over.id) {
                                        const oldIndex = order.indexOf(active.id as keyof Tune);
                                        const newIndex = order.indexOf(over.id as keyof Tune);
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
                            <TunesTableRow
                                key={`row-${index}`}
                                tune={row}
                                sortedFields={sortedFields}
                            />)}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            <TunesTablePagination/>
        </>
    );
}

export default TunesTable;
