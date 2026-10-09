import {useEffect, useState} from "react";
import {
    DataTable,
    DataTableColumn,
    DataTableProps
} from "mantine-datatable";
import {Group} from "@mantine/core";

import 'mantine-datatable/styles.layer.css';

const PAGE_SIZES = [10, 20, 50];

type Properties<T> = Extract<
    DataTableProps<T>,
    { columns: DataTableColumn<T>[] }
>;

const PaginatedTable = <T, >({
                                 columns,
                                 records = [],
                                 ...props
                             }: Properties<T>) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const from = (page - 1) * pageSize;
    const paginatedRecords = records.slice(from, from + pageSize);

    useEffect(() => {
        setPage(1);
    }, [records]);

    return (
        <DataTable
            className="data-table"
            withRowBorders={false}
            columns={columns}
            records={paginatedRecords}
            totalRecords={records.length}
            paginationActiveBackgroundColor="dark"
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={(size) => {
                setPageSize(size);
                setPage(1);
            }}
            renderPagination={({Controls}) => (
                <Group justify="end" w="100%">
                    <Controls.Pagination
                        styles={{
                            control: {
                                border: "none",
                            },
                        }}
                    />
                </Group>
            )}
            {...props}
        />
    );
};

export default PaginatedTable;