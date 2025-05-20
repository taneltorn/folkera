import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Table} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import SimilarRecordingsTableRow from "./SimilarRecordingsTableRow.tsx";
import Loading from "../../../../components/Loading.tsx";

interface Properties {
    recordings: Recording[];
    isLoading?: boolean;
    loadingText?: string;
}

const SimilarRecordingsTable: React.FC<Properties> = ({recordings, isLoading, loadingText}) => {

    const {t} = useTranslation();

    return (
        <Box pos={"relative"} mih={50}>
            <Loading
                isLoading={!!isLoading}
                text={loadingText}
            />
            {recordings.length > 0 &&
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th pl={"lg"}>{t("recording.ref")}</Table.Th>
                            <Table.Th>{t("recording.content")}</Table.Th>
                            <Table.Th>{t("recording.tune")}</Table.Th>
                            <Table.Th>{t("recording.datatype")}</Table.Th>
                            <Table.Th>{t("recording.year")}</Table.Th>
                            <Table.Th>{t("recording.instrument")}</Table.Th>
                            <Table.Th>{t("recording.performer")}</Table.Th>
                            <Table.Th>{t("recording.parish")}</Table.Th>
                            <Table.Th>{t("recording.similarity")}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {recordings.map((recording) => (
                            <SimilarRecordingsTableRow key={recording.id} recording={recording}/>
                        ))}
                    </Table.Tbody>
                </Table>}
        </Box>);
}

export default SimilarRecordingsTable;
