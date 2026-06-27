import React, {ReactNode, useEffect, useState} from "react";
import {CloseButton, Group, Switch, Table, TextInput} from "@mantine/core";
import {useClickOutside, useFocusTrap} from "@mantine/hooks";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {transform} from "./helpers.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

interface Properties {
    tune: Tune;
    field: keyof Tune;
    children: ReactNode;
    unmodifiable?: boolean;
    alwaysVisible?: boolean;
}

const TunesTableCell: React.FC<Properties> = ({tune, field, alwaysVisible, children}) => {

    const ref = useClickOutside(() => handleChange(value));

    const [value, setValue] = useState(tune[field]);
    const focusTrapRef = useFocusTrap();
    const {visibleFields} = useDataContext();
    const {addModification} = useModifications();
    const {state} = useControlState();

    const handleChange = (value: string | number | boolean | undefined) => {
        if (tune[field] !== value) {
            // @ts-ignore
            tune[field] = transform(value, field);
            addModification(tune);
        }
    }

    const handleCancel = () => {
        setValue(tune[field]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "Tab"].includes(e.key)) {
            handleChange(value);
        }
        if (e.key === "Escape") {
            handleCancel();
        }
    };

    useEffect(() => {
        setValue(tune[field]);
    }, [tune[field]]);

    return (
        <Table.Td
            py={"lg"}
            hidden={!alwaysVisible && !visibleFields.includes(field)}
            style={{borderLeft: "1px solid #efefef"}}
        >
            {visibleFields.includes(field) && <>
                {state === ControlState.EDIT ? (
                    ["hideTempo", "hideTimeSignature"].includes(field) ? (
                        <Switch
                            checked={!!value}
                            onChange={(e) => {
                                const checked = e.currentTarget.checked;
                                setValue(checked);
                                handleChange(checked);
                            }}
                        />
                    ) : (
                        <Group wrap="nowrap" gap={4} ref={ref}>
                            <TextInput
                                ref={focusTrapRef}
                                value={value as string | number | undefined}
                                w="100%"
                                size="xs"
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setValue(e.target.value)}
                                rightSection={
                                    <CloseButton
                                        size="md"
                                        className="hover-pointer"
                                        onClick={() => setValue("")}
                                        style={{display: value ? undefined : "none"}}
                                    />
                                }
                            />
                        </Group>
                    )
                ) : (
                    <Group gap={4}>
                        {children}
                    </Group>
                )}
            </>}
        </Table.Td>
    );
}

export default TunesTableCell;
