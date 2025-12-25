import React, {useRef} from "react";
import {Checkbox, Group, Table, Text} from "@mantine/core";
import RecordingsTableCell from "./RecordingsTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Recording} from "../../../../model/Recording.ts";
import PlayRecordingButton from "./controls/PlayRecordingButton.tsx";
import {Link} from "react-router-dom";
import {RecordingTableField} from "../../../../hooks/useTableOrder.ts";
import {useRecordingSelection} from "../../../../hooks/useRecordingSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

interface Properties {
    recording: Recording;
    sortedFields: RecordingTableField[];
}

const RecordingsTableRow: React.FC<Properties> = ({recording, sortedFields}) => {

    const ref = useRef<HTMLTableRowElement | null>(null);
    const {selection, toggleSelection} = useRecordingSelection();
    const {state} = useControlState();

    return (
        <Table.Tr ref={ref}>
            <Table.Td>
                <Group justify={"center"}>
                    {state === ControlState.SELECT
                        ? <Checkbox
                            p={"xs"}
                            size={"sm"}
                            radius={"sm"}
                            checked={!!selection.find(r => r.id === recording.id)}
                            onChange={() => toggleSelection(recording)}
                        />
                        : <PlayRecordingButton recording={recording}/>}
                </Group>
            </Table.Td>

            {sortedFields.map((tf) => (
                <RecordingsTableCell key={tf.field} recording={recording} field={tf.field}
                                     unmodifiable={["ref"].includes(tf.field)}>
                    {(() => {
                        switch (tf.field) {
                            case "ref":
                                return (
                                    <Group wrap={"nowrap"}>
                                        <Link to={`/recordings/${recording.id}`}>
                                            <Text size="xs" fw="bolder">
                                                {recording.ref}
                                            </Text>
                                        </Link>
                                    </Group>
                                );
                            case "content":
                                return <Text size="xs">{recording.content}</Text>;
                            case "notes":
                            case "duration":
                            case "comments":
                                return recording[tf.field];
                            default:
                                return (
                                    <FilterButtons
                                        recording={recording}
                                        field={tf.field}
                                        split={tf.split || undefined}
                                    />
                                );
                        }
                    })()}
                </RecordingsTableCell>
            ))}
        </Table.Tr>
    );
}

export default RecordingsTableRow;
