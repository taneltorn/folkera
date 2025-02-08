import React, {ReactNode, useEffect, useState} from "react";
import {Group, Input, Table} from "@mantine/core";
import {useClickOutside, useFocusTrap} from "@mantine/hooks";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";

interface Properties {
    recording: Recording;
    field: keyof Recording;
    children: ReactNode;
    unmodifiable?: boolean;
}

const RecordingTableCell: React.FC<Properties> = ({recording, field, unmodifiable,children}) => {

    const ref = useClickOutside(() => handleChange());

    const [value, setValue] = useState(recording[field]);
    const [isEdit, setIsEdit] = useState(false);
    const focusTrapRef = useFocusTrap();
    const {hiddenFields, toggleField} = useDataFiltering();
    const {addModification, modifications} = useModifications();
    const {currentUser} = useAuth();

    const handleChange = () => {
        if (recording[field] !== value) {
            if (!modifications.length) {
                
            }
            
            // @ts-ignore
            recording[field] = value;
            addModification(recording);
        }
        setIsEdit(false)
    }

    const handleCancel = () => {
        setValue(recording[field]);
        setIsEdit(false);
    };

    const handleEditClick = (e: any) => {
        if (!currentUser?.isAdmin || unmodifiable) {
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
            handleChange();
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
            hidden={hiddenFields.includes(field)}
            onClick={handleEditClick}
            style={{borderLeft: "1px solid #efefef"}}
        >
            {!hiddenFields.includes(field) && <>
                {isEdit
                    ? <Group wrap={"nowrap"} gap={4} ref={ref} display={"flex"}>
                        <Input
                            ref={focusTrapRef}
                            value={value}
                            w={"100%"}
                            size={"xs"}
                            onKeyDown={handleKeyDown}
                            onChange={e => setValue(e.target.value)}
                        />
                    </Group>
                    : <Group gap={4}>
                        {children}
                    </Group>}
            </>}
        </Table.Td>
    );
}

export default RecordingTableCell;
