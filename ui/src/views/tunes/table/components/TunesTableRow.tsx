import React from "react";
import {Group, Switch, Table, Text} from "@mantine/core";
import TunesTableCell from "./TunesTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {TunesTableField} from "../../../../utils/fields.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {useHover} from "@mantine/hooks";
import TuneLink from "../../../../components/TuneLink.tsx";
import {refToId} from "../../../../utils/helpers.tsx";
import ModifyTuneButton from "../../components/controls/ModifyTuneButton.tsx";
import {AiFillEdit} from "react-icons/ai";
import {Size} from "../../../../utils/constants.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";

interface Properties {
    tune: Tune;
    sortedFields: TunesTableField[];
}

const TunesTableRow: React.FC<Properties> = ({tune, sortedFields}) => {

    const {currentUser} = useAuth();
    const {hovered, ref} = useHover();
    const {loadData} = useDataContext();

    return (
        <Table.Tr ref={ref}>
            <Table.Td>
                <Group justify={"center"}>
                    <Group wrap={"nowrap"} gap={0}>
                        <TunesTablePlayAudioButton tune={tune} hovered={hovered}/>
                    </Group>
                </Group>
            </Table.Td>

            {sortedFields.map((tf) => (
                <TunesTableCell key={tf.field} tune={tune} field={tf.field}
                                unmodifiable={["ref"].includes(tf.field)}>
                    {(() => {
                        switch (tf.field) {
                            case "ref":
                                return <TuneLink to={`/tunes/${tune.id}`} label={tune.ref}/>
                            case "audioRef":
                                return <TuneLink to={`/tunes/${refToId(tune.audioRef)}`} label={tune.audioRef}/>
                            case "notationRef":
                                return <TuneLink to={`/tunes/${refToId(tune.notationRef)}`} label={tune.notationRef}/>
                            case "content":
                                return <Text size="sm" fw={500} c={"dark.4"}>{tune.content}</Text>;
                            case "notes":
                            case "duration":
                            case "comments":
                            case "musicxml":
                            case "audio":
                            case "notation":
                            case "flatLink":
                            case "pid":
                            case "id":
                            case "order":
                                return tune[tf.field];
                            case "hideTempo":
                            case "hideTimeSignature":
                                return <Switch checked={tune[tf.field]}/>;
                            default:
                                return (
                                    <FilterButtons
                                        tune={tune}
                                        field={tf.field}
                                        split={tf.split || undefined}
                                    />
                                );
                        }
                    })()}
                </TunesTableCell>
            ))}

            {currentUser?.isAdmin &&
                <Table.Td>
                    <ModifyTuneButton
                        variant={"transparent"}
                        color={hovered ? "dark" : "white"}
                        size={"compact-xl"}
                        tune={tune}
                        onSubmit={loadData}
                    >
                        <AiFillEdit size={Size.icon.SM}/>
                    </ModifyTuneButton>
                </Table.Td>}
        </Table.Tr>
    );
}

export default TunesTableRow;
