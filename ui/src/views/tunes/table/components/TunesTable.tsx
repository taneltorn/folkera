import React from "react";
import {Divider, Group, ScrollArea, Table,} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import TunesTablePagination from "./TunesTablePagination.tsx";
import {Tune} from "../../../../model/Tune.ts";
import TunesTableRow from "./TunesTableRow.tsx";
import DataTypeSelector from "./controls/DataTypeSelector.tsx";
import TunesTableHeaderCell from "./TunesTableHeaderCell.tsx";
import {useTableColumnOrderContext} from "../../../../hooks/useTableColumnOrderContext.tsx";
import NoData from "./NoData.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import Loading from "../../../../components/Loading.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    data: Tune[];
}

const TunesTable: React.FC<Properties> = ({data}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {isLoading} = useDataContext();
    const {sortedFields} = useTableColumnOrderContext();

    return (
        <>
            <ScrollArea pb={"xs"}>
                <Table
                    className={"tunes-table"}
                    highlightOnHover
                    withColumnBorders={false}
                    withRowBorders={false}
                    stickyHeader={true}
                >
                    <Table.Thead>
                        <Table.Tr className={"hover-parent"}>
                            <Table.Th w={50}>
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

                            {currentUser && <Table.Th pos="sticky" right={0}/>}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody pos={"relative"}>
                        {isLoading && (
                            <Table.Tr>
                                <Table.Td>
                                    <Loading isLoading={isLoading} text={t("loading.data")}/>
                                </Table.Td>
                            </Table.Tr>)}

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

            <NoData show={!data.length && !isLoading}/>
        </>
    );
}

export default TunesTable;
