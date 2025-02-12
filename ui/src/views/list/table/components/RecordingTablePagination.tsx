import React from "react";
import {Button, Group, Loader, Pagination, useMantineTheme} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {ItemsPerPageOptions} from "../../../../utils/lists.ts";

const RecordingTablePagination: React.FC = () => {

    const theme = useMantineTheme();
    const {pagination, setPagination, totalPages, isLoading} = useDataContext();

    return (
        <Group mt={"md"} px={"md"} justify={"space-between"}>
            <Group>
            <Group gap={4}>
                {ItemsPerPageOptions.map(it => (
                    <Button
                        key={it}
                        size={"xs"}
                        color={theme.primaryColor}
                        visibleFrom={"md"}
                        variant={it === pagination.size ? "filled" : "default"}
                        onClick={() => setPagination({...pagination, page: 1, size: it})}
                    >
                        {it}
                    </Button>))}
                
                
            </Group>
                {isLoading && <Loader size={"sm"}/>}
            </Group>
            <Pagination
                value={pagination.page}
                total={totalPages}
                onChange={(value) => setPagination({...pagination, page: value})}
            />
        </Group>
    );
}

export default RecordingTablePagination;
