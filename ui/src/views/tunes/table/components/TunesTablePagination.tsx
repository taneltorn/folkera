import React from "react";
import {Button, Group, Pagination} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {ItemsPerPageOptions} from "../../../../utils/lists.ts";
import {useTranslation} from "react-i18next";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const TunesTablePagination: React.FC = () => {

    const {t} = useTranslation();

    const {pagination, setPagination, totalPages} = useDataContext();
    const bp = useCurrentBreakpoint();

    return (
        <Group mt={"md"} px={"md"} justify={"space-between"}>
            <Group gap={"xs"}>
                {ItemsPerPageOptions.map(it => (
                    <Button
                        key={it}
                        size={"xs"}
                        title={t("pagination.itemsPerPage", {n: it})}
                        px={7}
                        h={26}
                        color={it === pagination.size ? "dark" : "dark"}
                        variant={it === pagination.size ? "filled" : "transparent"}
                        style={{border: "none"}}
                        onClick={() => setPagination({...pagination, page: 1, size: it})}
                    >
                        {it}
                    </Button>))}
            </Group>

            <Pagination
                color={"dark.9"}
                size={"sm"}
                withPages={!["xxs", "xs"].includes(bp)}
                variant={"subtle"}
                value={pagination.page}
                total={totalPages}
                onChange={(value) => setPagination({...pagination, page: value})}
                styles={{
                    control: {
                        border: 'none',
                    },
                }}
            />
        </Group>
    );
}

export default TunesTablePagination;
