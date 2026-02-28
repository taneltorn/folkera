import React, {useRef} from "react";
import {Badge, Checkbox, Group, Table} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {useNavigate} from "react-router-dom";
import {
    similarityToColor,
    distanceToSimilarity,
    similarityToLabel
} from "../../../../utils/helpers.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import ModifyTuneButton from "../../components/controls/ModifyTuneButton.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {useTranslation} from "react-i18next";
import IconButton from "../../../../components/buttons/IconButton.tsx";
import {AiFillEdit} from "react-icons/ai";

interface Properties {
    tune: Tune;
}

const SimilarTunesTableRow: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const ref = useRef<HTMLTableRowElement | null>(null);
    const {currentUser} = useAuth();
    const {selection, toggleSelection} = useTuneSelection();
    const {state} = useControlState();
    const navigate = useNavigate();

    const similarity: number = distanceToSimilarity(tune.distance);

    return (
        <Table.Tr key={tune.id} ref={ref}>
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
            <Table.Td>
                <Badge fullWidth={true} color={similarityToColor(similarity)} title={`${similarity}%`}>
                    {t(`similarity.${similarityToLabel(similarity)}`)}
                </Badge>
            </Table.Td>
            <Table.Td>{tune.content}</Table.Td>
            {["ref", "melody", "year", "instrument", "performer", "parish"].map(f => (
                <Table.Td>
                    {tune[f as keyof Tune]}
                </Table.Td>
            ))}

            <Table.Td>
                <Group gap={0} justify={"end"} wrap={"nowrap"}>
                    <IconButton
                        type={"open"}
                        onClick={() => navigate(`/tunes/${tune.id}`)}
                    />
                    {currentUser?.isAdmin && <ModifyTuneButton
                        variant={"subtle"}
                        color={"dark"}
                        size={"compact-xl"}
                        tune={tune}
                    >
                        <AiFillEdit size={Size.icon.SM}/>
                    </ModifyTuneButton>}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default SimilarTunesTableRow;
