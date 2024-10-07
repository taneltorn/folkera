import React from "react";
import {Table,} from "@mantine/core";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import RecordingTableRow from "./RecordingTableRow.tsx";
import RecordingTableHeaderWithInput from "./RecordingTableHeaderWithInput.tsx";
import RecordingTableHeaderWithSelect from "./RecordingTableHeaderWithSelect.tsx";
import {useTranslation} from "react-i18next";
import RecordingTablePagination from "./RecordingTablePagination.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import {Recording} from "../../../model/Recording.ts";


interface Properties {
    data: Recording[]
}

const RecordingTable: React.FC<Properties> = ({data}) => {

    const {t} = useTranslation();
    const {activePage, itemsPerPage, filteringOptions} = useDataFiltering();
    const {modifications} = useModifications();

    return (
        <>
            <Table highlightOnHover stickyHeader={true} opacity={modifications.length ? 0.75 : 1}>
                <Table.Thead>
                    <Table.Tr>
                        <RecordingTableHeaderWithInput
                            field={"ref"}
                            sortField={"order"}
                            placeholder={t("recording.ref")}
                        />
                        <RecordingTableHeaderWithInput
                            field={"content"}
                            placeholder={t("recording.content")}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"piece"}
                            placeholder={t("recording.piece")}
                            options={filteringOptions.piece}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"melody"}
                            placeholder={t("recording.melody")}
                            options={filteringOptions.melody}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"year"}
                            placeholder={t("recording.year")}
                            options={filteringOptions.year}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"instrument"}
                            placeholder={t("recording.instrument")}
                            options={filteringOptions.instrument}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"performer"}
                            placeholder={t("recording.performer")}
                            options={filteringOptions.performer}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"location"}
                            placeholder={t("recording.location")}
                            options={filteringOptions.location}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"collector"}
                            placeholder={t("recording.collector")}
                            options={filteringOptions.collector}
                        />
                        <RecordingTableHeaderWithSelect
                            field={"archive"}
                            placeholder={t("recording.archive")}
                            options={filteringOptions.archive}
                        />
                        <RecordingTableHeaderWithInput
                            field={"notes"}
                            placeholder={t("recording.notes")}
                        />
                        <RecordingTableHeaderWithInput
                            field={"comments"}
                            placeholder={t("recording.comments")}
                        />
                        <RecordingTableHeaderWithInput
                            field={"file"}
                            placeholder={t("recording.file")}
                        />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data
                        .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                        .map((row, index) =>
                            <RecordingTableRow key={`row-${index}`} recording={row}/>)}
                </Table.Tbody>
            </Table>

            <RecordingTablePagination totalItems={data.length}/>
        </>
    );
}

export default RecordingTable;
