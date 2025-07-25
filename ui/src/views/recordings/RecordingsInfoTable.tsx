import React from "react";
import {Grid, ScrollArea, Table} from "@mantine/core";
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
                <ScrollArea pb={"xs"}>
                    <Table>
                        <Table.Tbody>
                            {["ref",
                                "year",
                                "tune",
                                "instrument",
                                "performer",
                                "dance",
                                "parish",
                                "origin",
                                "collector",
                                "archive",
                                "notes",
                                "comments"]
                                .map((field) => (<>
                                    {recording[field as keyof Recording] &&
                                        <RecordingsInfoTableRow
                                            key={field}
                                            field={field as keyof Recording}
                                            recording={recording}
                                            separator={separatedFields.includes(field) ? "," : ""}
                                        />}
                                </>))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Grid.Col>
        </Grid>
    );
}

export default RecordingsInfoTable;
