import React, {useRef} from "react";
import {Group, Progress, Table, Text} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import PlayRecordingButton from "./controls/PlayRecordingButton.tsx";
import {Link} from "react-router-dom";
import FilterButtons from "./controls/FilterButtons.tsx";
import {similarityToColor, distanceToSimilarity} from "../../../../utils/helpers.tsx";
import RecordingTableCell from "./RecordingTableCell.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import ModifyRecordingButton from "../../../admin/users/components/ModifyRecordingButton.tsx";
import {RiEdit2Fill} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    recording: Recording;
}

const SimilarRecordingsTableRow: React.FC<Properties> = ({recording}) => {

    const ref = useRef<any>();
    const {currentUser} = useAuth();
    
    const min = 70;
    const max = 95;

    const similarity: number = distanceToSimilarity(recording.distance);
    const progress = Math.min(Math.max((similarity - min) / (max - min), 0), 1) * 100;

    return (
        <Table.Tr key={recording.id} ref={ref}>
            <Table.Td>
                <Group justify={"center"}>
                    <PlayRecordingButton recording={recording}/>
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

            <RecordingTableCell recording={recording} field={"tune"} alwaysVisible>
                <FilterButtons
                    recording={recording}
                    field={"tune"}
                    returnHome
                    replace
                />
            </RecordingTableCell>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"year"}
                    returnHome
                    replace
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"instrument"}
                    split={","}
                    returnHome
                    replace
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"performer"}
                    split={","}
                    returnHome
                    replace
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    recording={recording}
                    field={"parish"}
                    split={","}
                    returnHome
                    replace
                />
            </Table.Td>
            <Table.Td miw={150} pr={"xl"}>
                <Group gap={"xs"} wrap={"nowrap"}>
                    <Progress w={"100%"} value={progress} color={similarityToColor(similarity)}/>
                    {/*{similarity.toFixed(0) + "%"}*/}
                </Group>
            </Table.Td>
            { currentUser?.isAdmin && <Table.Td>
                <ModifyRecordingButton
                    variant={"subtle"}
                    recording={recording}
                >
                    <RiEdit2Fill size={Size.icon.SM}/>
                </ModifyRecordingButton>
                
            </Table.Td>}
        </Table.Tr>
    );
}

export default SimilarRecordingsTableRow;
