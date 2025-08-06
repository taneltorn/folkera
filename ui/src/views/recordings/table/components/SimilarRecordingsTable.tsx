import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Group, ScrollArea, Table, Pagination as MantinePagination} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import SimilarRecordingsTableRow from "./SimilarRecordingsTableRow.tsx";
import Loading from "../../../../components/Loading.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {IoIosMusicalNotes} from "react-icons/io";
import {Size} from "../../../../utils/constants.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {Pagination} from "../../../../model/Pagination.ts";

interface Properties {
    recordings: Recording[];
    isLoading?: boolean;
    loadingText?: string;
}

const SimilarRecordingsTable: React.FC<Properties> = ({recordings, isLoading, loadingText}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {modifications} = useModifications();
    const [pagination, setPagination] = useState<Pagination>({size: 20, page: 1});

    return (
        <Box pos={"relative"} mih={50}>
            <Loading
                isLoading={!!isLoading}
                text={loadingText}
            />
            <ScrollArea pb={"xs"}>
                {recordings.length > 0 &&
                    <Table highlightOnHover stickyHeader={true} opacity={(modifications.length || isLoading) ? 0.8 : 1}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    <Group justify={"center"}>
                                        <IoIosMusicalNotes size={Size.icon.SM}/>
                                    </Group>
                                </Table.Th>
                                <Table.Th>{t("recording.ref")}</Table.Th>
                                <Table.Th>{t("recording.content")}</Table.Th>
                                <Table.Th>{t("recording.tune")}</Table.Th>
                                <Table.Th>{t("recording.year")}</Table.Th>
                                <Table.Th>{t("recording.instrument")}</Table.Th>
                                <Table.Th>{t("recording.performer")}</Table.Th>
                                <Table.Th>{t("recording.parish")}</Table.Th>
                                <Table.Th>{t("recording.similarity")}</Table.Th>
                                {currentUser?.isAdmin && <Table.Th/>}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {recordings
                                .slice(pagination.page && pagination.size
                                        ? (pagination.page - 1) * pagination.size
                                        : 0,
                                    pagination.page && pagination.size ?
                                        pagination.page * pagination.size
                                        : 100)
                                .map((recording) => (
                                    <SimilarRecordingsTableRow key={recording.id} recording={recording}/>
                                ))}
                        </Table.Tbody>
                    </Table>}
            </ScrollArea>
            <Group mt={"md"} mb={85} px={"md"} justify={"end"}>
                <MantinePagination
                    value={pagination.page}
                    total={pagination.size ? Math.ceil(recordings.length / pagination.size) : recordings.length}
                    onChange={(value) => setPagination({...pagination, page: value})}
                />
            </Group>
        </Box>);
}

export default SimilarRecordingsTable;
