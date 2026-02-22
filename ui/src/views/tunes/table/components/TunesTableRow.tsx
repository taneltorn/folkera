import React, {useRef} from "react";
import {Checkbox, Group, Table, Text} from "@mantine/core";
import TunesTableCell from "./TunesTableCell.tsx";
import FilterButtons from "./controls/FilterButtons.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {Link} from "react-router-dom";
import {TunesTableField} from "../../../../hooks/useTableOrder.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import TunesTablePlayAudioButton from "./controls/TunesTablePlayAudioButton.tsx";
import ShowNotationButton from "../../components/controls/ShowNotationButton.tsx";

interface Properties {
    tune: Tune;
    sortedFields: TunesTableField[];
}

const TunesTableRow: React.FC<Properties> = ({tune, sortedFields}) => {

    const ref = useRef<HTMLTableRowElement | null>(null);
    const {selection, toggleSelection} = useTuneSelection();
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
                            checked={!!selection.find(r => r.id === tune.id)}
                            onChange={() => toggleSelection(tune)}
                        />
                        : <Group wrap={"nowrap"} gap={0}>
                            {tune.datatype === "AUDIO" && <TunesTablePlayAudioButton tune={tune}/>}
                            {tune.datatype === "NOOT" && <ShowNotationButton tune={tune}/>}
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
                                            <Text size="xs" fw="bolder">
                                                {tune.ref}
                                            </Text>
                                        </Link>
                                    </Group>
                                );
                            case "content":
                                return <Text size="xs">{tune.content}</Text>;
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
