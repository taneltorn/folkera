import React from "react";
import {Grid, Table} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import RecordingsInfoTableRow from "./RecordingsInfoTableRow.tsx";

interface Properties {
    recording: Recording;
}

const separatedFields = ["year", "instrument", "performer", "collector"]
const RecordingsInfoTable: React.FC<Properties> = ({recording}) => {

    return (
        <Grid>
            <Grid.Col span={{baseline: 12, md: 8, xl: 6}}>
                <Table>
                    <Table.Tbody>
                        {["ref",
                            "pid",
                            "year",
                            "tune",
                            "instrument",
                            "performer",
                            "dance",
                            "parish",
                            "origin",
                            "collector",
                            "archive",
                            "trainset",
                            "notes",
                            "comments"]
                            .map((field, index) => (
                                <React.Fragment key={`row-div-${index}-${field}`}>
                                    {recording[field as keyof Recording] &&
                                        <RecordingsInfoTableRow
                                            key={`info-table-row-${index}-${field}`}
                                            field={field as keyof Recording}
                                            recording={recording}
                                            separator={separatedFields.includes(field) ? "," : ""}
                                        />}
                                </React.Fragment>))}
                    </Table.Tbody>
                </Table>
            </Grid.Col>
        </Grid>
    );
}

export default RecordingsInfoTable;
