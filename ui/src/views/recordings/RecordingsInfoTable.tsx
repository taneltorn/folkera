import React from "react";
import {ScrollArea} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import RecordingsInfoTableRow from "./RecordingsInfoTableRow.tsx";

interface Properties {
    recording: Recording;
}

const separatedFields = ["year", "instrument", "performer", "collector"];

const RecordingsInfoTable: React.FC<Properties> = ({recording}) => {

    return (
        <ScrollArea pb={"xs"}>
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
        </ScrollArea>
    );
}

export default RecordingsInfoTable;
