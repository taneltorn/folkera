import React from "react";
import {Badge, Group, Table} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {useNavigate} from "react-router-dom";
import {distanceToColor, distanceToLabel} from "../../../../utils/helpers.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import ModifyTuneButton from "../../components/controls/ModifyTuneButton.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import IconButton from "../../../../components/buttons/IconButton.tsx";
import {AiFillEdit} from "react-icons/ai";
import {useHover} from "@mantine/hooks";

interface Properties {
    tune: Tune;
}

const SimilarTunesTableRow: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const {hovered, ref} = useHover();

    return (
        <Table.Tr key={tune.id} ref={ref}>
            <Table.Td>
                <Group justify={"center"}>
                    <TunesTablePlayAudioButton tune={tune} hovered={hovered}/>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    w={120}
                    radius={"md"}
                    color={distanceToColor(tune.distance)}
                    title={`${tune.distance || "N/a"}`}
                >
                    {t(`similarity.${distanceToLabel(tune.distance)}`)}
                </Badge>
            </Table.Td>
            {["melody", "ref", "content", "year", "instrument", "performer", "parish"].map(f => (
                <Table.Td key={f}>
                    {tune[f as keyof Tune]}
                </Table.Td>
            ))}

            <Table.Td>
                <Group gap={0} justify={"end"} wrap={"nowrap"}>
                    {currentUser?.isAdmin &&
                        <ModifyTuneButton
                            variant={"transparent"}
                            color={"dark.9"}
                            size={"compact-xl"}
                            tune={tune}
                        >
                            <AiFillEdit size={Size.icon.SM}/>
                        </ModifyTuneButton>}
                    <IconButton
                        type={"open"}
                        onClick={() => navigate(`/tunes/${tune.id}`)}
                    />
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default SimilarTunesTableRow;
