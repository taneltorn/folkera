import React from "react";
import {Badge, Group, Table} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {distanceToColor, distanceToLabel} from "../../../../utils/helpers.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import ModifyTuneButton from "../../components/controls/ModifyTuneButton.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {AiFillEdit} from "react-icons/ai";
import {useHover} from "@mantine/hooks";
import TuneLink from "../../../../components/TuneLink.tsx";

interface Properties {
    tune: Tune;
    onSave: () => void;
}

const SimilarTunesTableRow: React.FC<Properties> = ({tune, onSave}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
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
                    {f === "ref" ? <TuneLink to={`/tunes/${tune["id"]}`} label={tune["ref"]}/>
                        : tune[f as keyof Tune]}
                </Table.Td>
            ))}

            <Table.Td>
                <Group gap={0} justify={"end"} wrap={"nowrap"}>
                    {currentUser?.isAdmin &&
                        <Table.Td>
                            <ModifyTuneButton
                                variant={"transparent"}
                                color={hovered ? "dark" : "white"}
                                size={"compact-xl"}
                                tune={tune}
                                onSubmit={onSave}
                            >
                                <AiFillEdit size={Size.icon.SM}/>
                            </ModifyTuneButton>
                        </Table.Td>}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default SimilarTunesTableRow;
