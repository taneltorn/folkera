import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Group, ScrollArea, Table} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import SimilarRecordingsTableRow from "./SimilarRecordingsTableRow.tsx";
import Loading from "../../../../components/Loading.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {IoIosMusicalNotes} from "react-icons/io";
import {Size} from "../../../../utils/constants.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";

interface Properties {
    recordings: Recording[];
    isLoading?: boolean;
    loadingText?: string;
}

const SimilarRecordingsTable: React.FC<Properties> = ({recordings, isLoading, loadingText}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {modifications} = useModifications();

    return (
        <Box pos={"relative"} mih={50}>
            <Loading
                isLoading={!!isLoading}
                text={loadingText}
            />
            <ScrollArea>
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
                                {currentUser?.isAdmin && <Table.Th />}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {recordings.map((recording) => (
                                <SimilarRecordingsTableRow key={recording.id} recording={recording}/>
                            ))}
                        </Table.Tbody>
                    </Table>}
            </ScrollArea>
        </Box>);
}

export default SimilarRecordingsTable;
