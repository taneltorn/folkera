import React from "react";
import {Checkbox, Group, Table, Text} from "@mantine/core";
import TunesTableCell from "./TunesTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {Link} from "react-router-dom";
import {TunesTableField} from "../../../../utils/fields.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import {useHover} from "@mantine/hooks";

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
                                return (
                                    <Group wrap={"nowrap"}>
                                        <Link to={`/tunes/${tune.id}`}>
                                            <Text size="sm" fw={700}>
                                                {tune.ref}
                                            </Text>
                                        </Link>
                                    </Group>
                                );
                            case "content":
                                return <Text size="sm" fw={500} c={"dark.4"}>{tune.content}</Text>;
                            case "notes":
                            case "duration":
                            case "comments":
                                return tune[tf.field];
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
