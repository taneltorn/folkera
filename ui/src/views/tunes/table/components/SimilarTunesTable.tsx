import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Group, ScrollArea, Table, Pagination as MantinePagination} from "@mantine/core";
import SimilarTunesTableRow from "./SimilarTunesTableRow.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {IoIosMusicalNotes} from "react-icons/io";
import {Size} from "../../../../utils/constants.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {Pagination} from "../../../../model/Pagination.ts";
import {useSimilarTunes} from "../../../../hooks/useSimilarTunes.tsx";

interface Properties {
}

const SimilarTunesTable: React.FC<Properties> = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {modifications} = useModifications();
    const {similarTunes} = useSimilarTunes();
    const [pagination, setPagination] = useState<Pagination>({size: 10, page: 1});

    return (
        <Box pos={"relative"} mih={50}>
            <ScrollArea pb={"xs"}>
                {similarTunes.length > 0 &&
                    <Table highlightOnHover stickyHeader={true} opacity={(modifications.length) ? 0.8 : 1}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    <Group justify={"center"}>
                                        <IoIosMusicalNotes size={Size.icon.SM}/>
                                    </Group>
                                </Table.Th>
                                <Table.Th>{t("tune.ref")}</Table.Th>
                                <Table.Th>{t("tune.content")}</Table.Th>
                                <Table.Th>{t("tune.melody")}</Table.Th>
                                <Table.Th>{t("tune.year")}</Table.Th>
                                <Table.Th>{t("tune.instrument")}</Table.Th>
                                <Table.Th>{t("tune.performer")}</Table.Th>
                                <Table.Th>{t("tune.parish")}</Table.Th>
                                <Table.Th>{t("tune.similarity")}</Table.Th>
                                {currentUser?.isAdmin && <Table.Th/>}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {similarTunes
                                .slice(pagination.page && pagination.size
                                        ? (pagination.page - 1) * pagination.size
                                        : 0,
                                    pagination.page && pagination.size ?
                                        pagination.page * pagination.size
                                        : 100)
                                .map((tune) => (
                                    <SimilarTunesTableRow key={tune.id} tune={tune}/>
                                ))}
                        </Table.Tbody>
                    </Table>}
            </ScrollArea>
            <Group mt={"md"} mb={85} px={"md"} justify={"end"}>
                <MantinePagination
                    value={pagination.page}
                    total={pagination.size ? Math.ceil(similarTunes.length / pagination.size) : similarTunes.length}
                    onChange={(value) => setPagination({...pagination, page: value})}
                />
            </Group>
        </Box>);
}

export default SimilarTunesTable;
