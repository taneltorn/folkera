import React from "react";
import {Checkbox, Group, Switch, Table, Text} from "@mantine/core";
import TunesTableCell from "./TunesTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {TunesTableField} from "../../../../utils/fields.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {useHover} from "@mantine/hooks";
import TuneLink from "../../../../components/TuneLink.tsx";
import {refToId} from "../../../../utils/helpers.tsx";

interface Properties {
    tune: Tune;
    sortedFields: TunesTableField[];
}

const TunesTableRow: React.FC<Properties> = ({tune, sortedFields}) => {

    const {selection, toggleSelection} = useTuneSelection();
    const {state} = useControlState();

    const {hovered, ref} = useHover();

    return (
        <Table.Tr ref={ref}>
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
                        : <Group wrap={"nowrap"} gap={0}>
                            <TunesTablePlayAudioButton tune={tune} hovered={hovered}/>
                        </Group>}
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
        </Table.Tr>
    );
}

export default TunesTableRow;
