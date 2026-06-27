import React from "react";
import {Divider, Group, ScrollArea, Table,} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import TunesTablePagination from "./TunesTablePagination.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {Tune} from "../../../../model/Tune.ts";
import TunesTableRow from "./TunesTableRow.tsx";
import DataTypeSelector from "./controls/DataTypeSelector.tsx";
import TunesTableHeaderCell from "./TunesTableHeaderCell.tsx";
import {useTableColumnOrderContext} from "../../../../hooks/useTableColumnOrderContext.tsx";
import NoData from "./NoData.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";

interface Properties {
    data: Tune[];
}

const TunesTable: React.FC<Properties> = ({data}) => {

    const {currentUser} = useAuth();
    const {isLoading} = useDataContext();
    const {modifications} = useModifications();
    const {sortedFields} = useTableColumnOrderContext();

    return (
        <>
            <ScrollArea pb={"xs"}>
                <Table
                    highlightOnHover
                    withColumnBorders={false}
                    withRowBorders={false}
                    stickyHeader={true}
                    opacity={(modifications.length || isLoading) ? 0.8 : 1}
                >
                    <Table.Thead>
                        <Table.Tr className={"hover-parent"}>
                            <Table.Th>
                                <Group justify={"center"}>
                                    <DataTypeSelector/>
                                </Group>
                            </Table.Th>

                            {sortedFields.map((tf, i) =>
                                <TunesTableHeaderCell
                                    key={`header-${tf.field}-${i}`}
                                    field={tf.field}
                                    sortField={tf.sortField}
                                    type={tf.type}
                                />)}

                            {currentUser?.isAdmin && <Table.Th/>}
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

            {data.length > 0 && <>
                <Divider color={"gray.1"}/>
                <TunesTablePagination/>
            </>}

            <NoData show={!data.length}/>
        </>
    );
}

export default TunesTable;
