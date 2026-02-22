import React, {useRef} from "react";
import {Checkbox, Group, Progress, Table, Text} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {Link} from "react-router-dom";
import FilterButtons from "./controls/FilterButtons.tsx";
import {similarityToColor, distanceToSimilarity, similarityToOpacity} from "../../../../utils/helpers.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import ModifyTuneButton from "../../components/controls/ModifyTuneButton.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {RiEdit2Fill} from "react-icons/ri";

interface Properties {
    tune: Tune;
}

const SimilarTunesTableRow: React.FC<Properties> = ({tune}) => {

    const ref = useRef<HTMLTableRowElement | null>(null);
    const {currentUser} = useAuth();
    const {selection, toggleSelection} = useTuneSelection();
    const {state} = useControlState();

    const min = 70;
    const max = 95;

    const similarity: number = distanceToSimilarity(tune.distance);
    const progress = Math.min(Math.max((similarity - min) / (max - min), 0), 1) * 100;

    return (
        <Table.Tr key={tune.id} ref={ref} opacity={similarityToOpacity(similarity)}>
            <Table.Td>
                <Group justify={"center"}>
                    {state === ControlState.SELECT
                        ? <Checkbox
                            p={"xs"}
                            size={"sm"}
                            radius={"sm"}
                            checked={!!selection.find(r => r.id === tune.id)}
                            onChange={() => toggleSelection(tune)}
                        />
                        : <TunesTablePlayAudioButton tune={tune}/>}
                </Group>
            </Table.Td>
            <Table.Td miw={150}>
                <Group wrap={"nowrap"}>
                    <Text size={"xs"}>
                        <Link to={`/tunes/${tune.id}`}>
                            {tune.ref}
                        </Link>
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>{tune.content}</Table.Td>
            <Table.Td>
                <FilterButtons
                    tune={tune}
                    field={"melody"}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    tune={tune}
                    field={"year"}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    tune={tune}
                    field={"instrument"}
                    split={","}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    tune={tune}
                    field={"performer"}
                    split={","}
                    returnHome
                />
            </Table.Td>
            <Table.Td>
                <FilterButtons
                    tune={tune}
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
                <ModifyTuneButton
                    variant={"light"}
                    color={"dark"}
                    size={"compact-xl"}
                    tune={tune}
                >
                    <RiEdit2Fill size={Size.icon.SM}/>
                </ModifyTuneButton>
            </Table.Td>}
        </Table.Tr>
    );
}

export default SimilarTunesTableRow;
