import React, {ReactNode, useState} from "react";
import {Group, Table, Pagination as MantinePagination} from "@mantine/core";
import {Pagination} from "../../../../model/Pagination.ts";

interface Properties {
    isLoading?: boolean;
    headers: Array<string | ReactNode>;
    rows: ReactNode[];
}

const InMemoryPaginatedTable: React.FC<Properties> = ({headers, rows}) => {

    const [pagination, setPagination] = useState<Pagination>({size: 10, page: 1});

    return (<>
        <Table highlightOnHover stickyHeader={true}>
            <Table.Thead>
                <Table.Tr>
                    {headers.map((header, index) => (
                        <Table.Th key={`table-header-${index}`}>
                            {header}
                        </Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows
                    .slice(pagination.page && pagination.size
                            ? (pagination.page - 1) * pagination.size
                            : 0,
                        pagination.page && pagination.size ?
                            pagination.page * pagination.size
                            : 100)
                    .map(row => row)}
            </Table.Tbody>
        </Table>
        <Group mt={"md"} mb={85} px={"md"} justify={"end"}>
            <MantinePagination
                value={pagination.page}
                total={pagination.size ? Math.ceil(rows.length / pagination.size) : rows.length}
                onChange={(value) => setPagination({...pagination, page: value})}
            />
        </Group>
    </>);
}

export default InMemoryPaginatedTable;
