import React, {useRef} from "react";
import {Group, Table, Text} from "@mantine/core";
import RecordingTableCell from "./RecordingTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import PlayRecordingButton from "./controls/PlayRecordingButton.tsx";

interface Properties {
    recording: Recording;
}

const RecordingTableRow: React.FC<Properties> = ({recording}) => {

    const ref = useRef<any>();
    const {currentUser} = useAuth();

    return (
        <Table.Tr ref={ref}>
            <RecordingTableCell recording={recording} field={"ref"} unmodifiable>
                <Group gap={"xs"} wrap={"nowrap"}>
                    {currentUser?.isUser && <PlayRecordingButton recording={recording}/>}

                    <Text size={"xs"}>
                        {recording.ref}
                    </Text>
                </Group>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"content"}>
                <Text size={"xs"}>
                    {recording.content}
                </Text>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"piece"}>
                <FilterButtons
                    recording={recording}
                    field={"piece"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"melody"}>
                <FilterButtons
                    recording={recording}
                    field={"melody"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"parts"}>
                <FilterButtons
                    recording={recording}
                    field={"parts"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"quality"}>
                <FilterButtons
                    recording={recording}
                    field={"quality"}
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

            <RecordingTableCell recording={recording} field={"datatype"}>
                <FilterButtons
                    recording={recording}
                    field={"datatype"}
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

            <RecordingTableCell recording={recording} field={"location"}>
                <FilterButtons recording={recording} field={"location"} split={","}/>
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

            <RecordingTableCell recording={recording} field={"notes"}>
                {recording.notes}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"comments"}>
                {recording.comments}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"file"}>
                {recording.file}
            </RecordingTableCell>
        </Table.Tr>
    );
}

export default RecordingTableRow;
