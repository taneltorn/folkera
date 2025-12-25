import React, {useRef} from "react";
import {Checkbox, Group, Progress, Table, Text} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import PlayRecordingButton from "./controls/PlayRecordingButton.tsx";
import {Link} from "react-router-dom";
import FilterButtons from "./controls/FilterButtons.tsx";
import {similarityToColor, distanceToSimilarity, similarityToOpacity} from "../../../../utils/helpers.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import ModifyRecordingButton from "../../components/controls/ModifyRecordingButton.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useRecordingSelection} from "../../../../hooks/useRecordingSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {RiEdit2Fill} from "react-icons/ri";

interface Properties {
    recording: Recording;
}

const SimilarRecordingsTableRow: React.FC<Properties> = ({recording}) => {

    const ref = useRef<HTMLTableRowElement | null>(null);
    const {currentUser} = useAuth();
    const {selection, toggleSelection} = useRecordingSelection();
    const {state} = useControlState();

    const min = 70;
    const max = 95;

    const similarity: number = distanceToSimilarity(recording.distance);
    const progress = Math.min(Math.max((similarity - min) / (max - min), 0), 1) * 100;

    return (
        <Table.Tr key={recording.id} ref={ref} opacity={similarityToOpacity(similarity)}>
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
            <Table.Td miw={150}>
                <Group wrap={"nowrap"}>
                    <Text size={"xs"}>
                        <Link to={`/recordings/${recording.id}`}>
                            {recording.ref}
                        </Link>
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>{recording.content}</Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"tune"}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"year"}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"instrument"}
                    split={","}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"performer"}
                    split={","}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"parish"}
                    split={","}
                    returnHome
                />
            </Table.Td>
            <Table.Td miw={150} pr={"xl"}>
                <Group gap={"xs"} wrap={"nowrap"}>
                    <Progress w={"100%"} title={`${similarity}`} value={progress}
                              color={similarityToColor(similarity)}/>
                </Group>
            </Table.Td>
            {currentUser?.isAdmin && <Table.Td>
                <ModifyRecordingButton
                    variant={"light"}
                    color={"dark"}
                    size={"compact-xl"}
                    recording={recording}
                >
                    <RiEdit2Fill size={Size.icon.SM}/>
                </ModifyRecordingButton>
            </Table.Td>}
        </Table.Tr>
    );
}

export default SimilarRecordingsTableRow;
