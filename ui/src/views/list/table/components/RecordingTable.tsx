import React from "react";
import {Table} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import RecordingTableRow from "./RecordingTableRow.tsx";
import FilterInput from "./controls/FilterInput.tsx";
import {useTranslation} from "react-i18next";
import RecordingTablePagination from "./RecordingTablePagination.tsx";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import RecordingTableHeader from "./RecordingTableHeader.tsx";
import FilterSelect from "./controls/FilterSelect.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";

interface Properties {
    data: Recording[];
}

const RecordingTable: React.FC<Properties> = ({data}) => {

    const {t} = useTranslation();
    const {filteringOptions, isLoading} = useDataContext();
    const {modifications} = useModifications();

    return (
        <>
            <Table highlightOnHover stickyHeader={true} opacity={modifications.length || isLoading ? 0.7 : 1}>
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
                        <RecordingTableHeader field={"tune"}>
                            <FilterSelect
                                field={"tune"}
                                placeholder={t("recording.tune")}
                                options={filteringOptions.tune}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"dance"}>
                            <FilterSelect
                                field={"dance"}
                                placeholder={t("recording.dance")}
                                options={filteringOptions.dance}
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
                        <RecordingTableHeader field={"parish"}>
                            <FilterSelect
                                field={"parish"}
                                placeholder={t("recording.parish")}
                                options={filteringOptions.parish}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"origin"}>
                            <FilterSelect
                                field={"origin"}
                                placeholder={t("recording.origin")}
                                options={filteringOptions.origin}
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
                        <RecordingTableHeader field={"file"}>
                            <FilterSelect
                                field={"file"}
                                placeholder={t("recording.file")}
                                options={filteringOptions.file}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"duration"}>
                            <FilterInput
                                field={"duration"}
                                placeholder={t("recording.duration")}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"quality"}>
                            <FilterSelect
                                field={"quality"}
                                placeholder={t("recording.quality")}
                                options={filteringOptions.quality}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"datatype"}>
                            <FilterSelect
                                field={"datatype"}
                                placeholder={t("recording.datatype")}
                                options={filteringOptions.datatype}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"kivike"}>
                            <FilterSelect
                                field={"kivike"}
                                placeholder={t("recording.kivike")}
                                options={filteringOptions.kivike}
                            />
                        </RecordingTableHeader>
                        <RecordingTableHeader field={"comments"}>
                            <FilterSelect
                                field={"comments"}
                                placeholder={t("recording.comments")}
                                options={filteringOptions.comments}
                            />
                        </RecordingTableHeader>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((row, index) =>
                        <RecordingTableRow key={`row-${index}`} recording={row}/>)}
                </Table.Tbody>
            </Table>

            <RecordingTablePagination/>
        </>
    );
}

export default RecordingTable;
