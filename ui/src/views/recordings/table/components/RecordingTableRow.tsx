import React, {useRef} from "react";
import {Group, Table, Text} from "@mantine/core";
import RecordingTableCell from "./RecordingTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Recording} from "../../../../model/Recording.ts";
import PlayRecordingButton from "./controls/PlayRecordingButton.tsx";
import {Link} from "react-router-dom";

interface Properties {
    recording: Recording;
}

const RecordingTableRow: React.FC<Properties> = ({recording}) => {

    const ref = useRef<any>();

    return (
        <Table.Tr ref={ref}>
            <RecordingTableCell recording={recording} field={"ref"} unmodifiable>
                <Group gap={"xs"} wrap={"nowrap"}>
                    <PlayRecordingButton recording={recording}/>

                    <Link to={`/recordings/${recording.id}`}>
                        <Text size={"xs"} fw={"bolder"} >
                            {recording.ref} 
                        </Text>
                    </Link>
                </Group>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"content"} unmodifiable>
                <Text size={"xs"}>
                    {recording.content}
                </Text>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"tune"}>
                <FilterButtons
                    recording={recording}
                    field={"tune"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"datatype"}>
                <FilterButtons
                    recording={recording}
                    field={"datatype"}
                    split={","}
                />
            </RecordingTableCell>
            
            <RecordingTableCell recording={recording} field={"dance"}>
                <FilterButtons
                    recording={recording}
                    field={"dance"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"year"}>
                <FilterButtons
                    recording={recording}
                    field={"year"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"instrument"}>
                <FilterButtons
                    recording={recording}
                    field={"instrument"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"performer"}>
                <FilterButtons
                    recording={recording}
                    field={"performer"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"parish"}>
                <FilterButtons recording={recording} field={"parish"} split={","}/>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"origin"}>
                <FilterButtons recording={recording} field={"origin"} split={","}/>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"collector"}>
                <FilterButtons recording={recording} field={"collector"} split={","}/>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"archive"}>
                <FilterButtons
                    recording={recording}
                    field={"archive"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"notes"} unmodifiable>
                {recording.notes}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"file"}>
                {recording.file}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"duration"} unmodifiable>
                {recording.duration}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"quality"}>
                <FilterButtons
                    recording={recording}
                    field={"quality"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"kivike"}>
                <FilterButtons
                    recording={recording}
                    field={"kivike"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"comments"}>
                {recording.comments}
            </RecordingTableCell>
        </Table.Tr>
    );
}

export default RecordingTableRow;
