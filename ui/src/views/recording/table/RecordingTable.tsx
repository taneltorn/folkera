import React from "react";
import {Table,} from "@mantine/core";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import RecordingTableRow from "./components/RecordingTableRow.tsx";
import FilterInput from "./components/FilterInput.tsx";
import {useTranslation} from "react-i18next";
import RecordingTablePagination from "./components/RecordingTablePagination.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import RecordingTableHeaderWrapper from "./components/RecordingTableHeaderWrapper.tsx";
import FilterSelect from "./components/FilterSelect.tsx";

interface Properties {
}

const RecordingTable: React.FC<Properties> = () => {

    const {t} = useTranslation();
    const {activePage, itemsPerPage, filteredData, filteringOptions} = useDataFiltering();
    const {modifications} = useModifications();

    return (
        <>
            <Table highlightOnHover stickyHeader={true} opacity={modifications.length ? 0.75 : 1}>
                <Table.Thead>
                    <Table.Tr>
                        <RecordingTableHeaderWrapper field={"piece"} sortField={"order"}>
                            <FilterInput
                                field={"ref"}
                                placeholder={t("recording.ref")}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"content"}>
                            <FilterInput
                                field={"content"}
                                placeholder={t("recording.content")}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"piece"}>
                            <FilterSelect
                                field={"piece"}
                                placeholder={t("recording.piece")}
                                options={filteringOptions.piece}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"melody"}>
                            <FilterSelect
                                field={"melody"}
                                placeholder={t("recording.melody")}
                                options={filteringOptions.melody}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"year"}>
                            <FilterSelect
                                field={"year"}
                                placeholder={t("recording.year")}
                                options={filteringOptions.year}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"instrument"}>
                            <FilterSelect
                                field={"instrument"}
                                placeholder={t("recording.instrument")}
                                options={filteringOptions.instrument}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"performer"}>
                            <FilterSelect
                                field={"performer"}
                                placeholder={t("recording.performer")}
                                options={filteringOptions.performer}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"location"}>
                            <FilterSelect
                                field={"location"}
                                placeholder={t("recording.location")}
                                options={filteringOptions.location}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"collector"}>
                            <FilterSelect
                                field={"collector"}
                                placeholder={t("recording.collector")}
                                options={filteringOptions.collector}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"archive"}>
                            <FilterSelect
                                field={"archive"}
                                placeholder={t("recording.archive")}
                                options={filteringOptions.archive}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"notes"}>
                            <FilterInput
                                field={"notes"}
                                placeholder={t("recording.notes")}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"comments"}>
                            <FilterInput
                                field={"comments"}
                                placeholder={t("recording.comments")}
                            />
                        </RecordingTableHeaderWrapper>
                        <RecordingTableHeaderWrapper field={"file"}>
                            <FilterInput
                                field={"file"}
                                placeholder={t("recording.file")}
                            />
                        </RecordingTableHeaderWrapper>
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
