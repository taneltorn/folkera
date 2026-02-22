import React, {ReactNode, useEffect, useState} from "react";
import {CloseButton, Group, Table, TextInput} from "@mantine/core";
import {useClickOutside, useFocusTrap} from "@mantine/hooks";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {UserRole} from "../../../../model/User.ts";
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

const TunesTableCell: React.FC<Properties> = ({tune, field, unmodifiable, alwaysVisible, children}) => {

    const ref = useClickOutside(() => handleChange(value));

    const [value, setValue] = useState(tune[field]);
    const [isEdit, setIsEdit] = useState(false);
    const focusTrapRef = useFocusTrap();
    const {visibleFields} = useDataContext();
    const {addModification} = useModifications();
    const {currentUser} = useAuth();
    const {setState} = useControlState();

    const handleChange = (value: string | number | undefined) => {
        if (tune[field] !== value) {
            // @ts-ignore
            tune[field] = transform(value, field);
            addModification(tune);
            setState(ControlState.SAVE);
        }
        setIsEdit(false)
    }

    const handleCancel = () => {
        setValue(tune[field]);
        setIsEdit(false);
        setState(ControlState.IDLE);
    };

    const handleEditClick = (e: any) => {
        if (currentUser?.role !== UserRole.ADMIN || unmodifiable) {
            return;
        }
        if (!(e.target as HTMLElement).className.includes("pill-button") && !isEdit) {
            setIsEdit(true);
        }
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
            py={"xs"}
            className={"hover-pointer"}
            hidden={!alwaysVisible && !visibleFields.includes(field)}
            onClick={handleEditClick}
            style={{borderLeft: "1px solid #efefef"}}
        >
            {visibleFields.includes(field) && <>
                {isEdit
                    ? <Group wrap={"nowrap"} gap={4} ref={ref} display={"flex"}>
                        <TextInput
                            ref={focusTrapRef}
                            value={value}
                            w={"100%"}
                            size={"xs"}
                            onKeyDown={handleKeyDown}
                            onChange={e => setValue(e.target.value)}
                            rightSection={<CloseButton
                                size={"md"}
                                className={"hover-pointer"}
                                onClick={() => setValue("")}
                                style={{display: value ? undefined : 'none'}}
                            />}
                        />
                    </Group>
                    : <Group gap={4}>
                        {children}
                    </Group>}
            </>}
        </Table.Td>
    );
}

export default TunesTableCell;
