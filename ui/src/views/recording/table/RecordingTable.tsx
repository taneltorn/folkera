import React from "react";
import {Table} from "@mantine/core";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import RecordingTableRow from "./components/RecordingTableRow.tsx";
import FilterInput from "./components/controls/FilterInput.tsx";
import {useTranslation} from "react-i18next";
import RecordingTablePagination from "./components/RecordingTablePagination.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import RecordingTableHeader from "./components/RecordingTableHeader.tsx";
import FilterSelect from "./components/controls/FilterSelect.tsx";

interface Properties {
}

const RecordingTable: React.FC<Properties> = () => {

    const {t} = useTranslation();
    const {activePage, itemsPerPage, filteredData, filteringOptions} = useDataFiltering();
    const {modifications} = useModifications();

    return (
        <>
            <Table highlightOnHover stickyHeader={true} opacity={modifications.length ? 0.5 : 1}>
                <Table.Thead>
                    <Table.Tr>
                        <RecordingTableHeader field={"ref"} sortField={"order"}>
                            <FilterInput
                                field={"ref"}
                                placeholder={t("recording.ref")}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"content"}>
                            <FilterInput
                                field={"content"}
                                placeholder={t("recording.content")}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"piece"}>
                            <FilterSelect
                                field={"piece"}
                                placeholder={t("recording.piece")}
                                options={filteringOptions.piece}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"melody"}>
                            <FilterSelect
                                field={"melody"}
                                placeholder={t("recording.melody")}
                                options={filteringOptions.melody}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"parts"}>
                            <FilterSelect
                                field={"parts"}
                                placeholder={t("recording.parts")}
                                options={filteringOptions.parts}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"quality"}>
                            <FilterSelect
                                field={"quality"}
                                placeholder={t("recording.quality")}
                                options={filteringOptions.quality}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"dance"}>
                            <FilterSelect
                                field={"dance"}
                                placeholder={t("recording.dance")}
                                options={filteringOptions.dance}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"datatype"}>
                            <FilterSelect
                                field={"datatype"}
                                placeholder={t("recording.datatype")}
                                options={filteringOptions.datatype}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"year"}>
                            <FilterSelect
                                field={"year"}
                                placeholder={t("recording.year")}
                                options={filteringOptions.year}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"instrument"}>
                            <FilterSelect
                                field={"instrument"}
                                placeholder={t("recording.instrument")}
                                options={filteringOptions.instrument}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"performer"}>
                            <FilterSelect
                                field={"performer"}
                                placeholder={t("recording.performer")}
                                options={filteringOptions.performer}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"location"}>
                            <FilterSelect
                                field={"location"}
                                placeholder={t("recording.location")}
                                options={filteringOptions.location}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"collector"}>
                            <FilterSelect
                                field={"collector"}
                                placeholder={t("recording.collector")}
                                options={filteringOptions.collector}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"archive"}>
                            <FilterSelect
                                field={"archive"}
                                placeholder={t("recording.archive")}
                                options={filteringOptions.archive}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"notes"}>
                            <FilterInput
                                field={"notes"}
                                placeholder={t("recording.notes")}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"comments"}>
                            <FilterSelect
                                field={"comments"}
                                placeholder={t("recording.comments")}
                                options={filteringOptions.comments}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"file"}>
                            <FilterInput
                                field={"file"}
                                placeholder={t("recording.file")}
                            />
                        </RecordingTableHeader>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredData
                        .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                        .map((row, index) =>
                            <RecordingTableRow key={`row-${index}`} recording={row}/>)}
                </Table.Tbody>
            </Table>

            <RecordingTablePagination totalItems={filteredData.length}/>
        </>
    );
}

export default RecordingTable;
