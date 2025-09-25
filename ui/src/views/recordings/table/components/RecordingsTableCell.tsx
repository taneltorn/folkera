import React, {ReactNode, useEffect, useState} from "react";
import {CloseButton, Group, Table, TextInput} from "@mantine/core";
import {useClickOutside, useFocusTrap} from "@mantine/hooks";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Recording} from "../../../../model/Recording.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {UserRole} from "../../../../model/User.ts";
import {transform} from "./helpers.ts";

interface Properties {
    recording: Recording;
    field: keyof Recording;
    children: ReactNode;
    unmodifiable?: boolean;
    alwaysVisible?: boolean;
}

const RecordingsTableCell: React.FC<Properties> = ({recording, field, unmodifiable, alwaysVisible, children}) => {

    const ref = useClickOutside(() => handleChange(value));

    const [value, setValue] = useState(recording[field]);
    const [isEdit, setIsEdit] = useState(false);
    const focusTrapRef = useFocusTrap();
    const {hiddenFields, toggleField} = useDataContext();
    const {addModification} = useModifications();
    const {currentUser} = useAuth();

    const handleChange = (value: string | number | undefined) => {
        if (recording[field] !== value) {
            // @ts-ignore
            recording[field] = transform(value, field);
            addModification(recording);
        }
        setIsEdit(false)
    }

    const handleCancel = () => {
        setValue(recording[field]);
        setIsEdit(false);
    };

    const handleEditClick = (e: any) => {
        if (currentUser?.role !== UserRole.ADMIN || unmodifiable) {
            return;
        }
        if (hiddenFields.includes(field)) {
            toggleField(field);
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
        setValue(recording[field]);
    }, [recording[field]]);

    return (
        <Table.Td
            py={"xs"}
            className={"hover-pointer"}
            hidden={!alwaysVisible && hiddenFields.includes(field)}
            onClick={handleEditClick}
            style={{borderLeft: "1px solid #efefef"}}
        >
            {!hiddenFields.includes(field) && <>
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

export default RecordingsTableCell;
