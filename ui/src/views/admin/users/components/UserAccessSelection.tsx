import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {modals} from "@mantine/modals";
import {User} from "../../../../model/User.ts";
import useUserService from "../../../../hooks/useUserService.ts";
import {Checkbox, Group, Table, Text} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import CancelButton from "../../../../components/buttons/CancelButton.tsx";
import SaveButton from "../../../../components/buttons/SaveButton.tsx";
import {TuneAccess} from "../../../../model/TuneAccess.ts";
import useAccessService from "../../../../hooks/useAccessService.ts";

interface Properties {
    selectedTunes: Tune[];
    onSave: () => void;
}

const AssignAccess: React.FC<Properties> = ({selectedTunes, onSave}) => {

    const {t} = useTranslation();
    const {fetchUsers, cancelSource} = useUserService();
    const {assignAccess} = useAccessService();

    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const fetchData = () => {
        fetchUsers().then(result => {
            setUsers(result);
        });
    }

    const handleSave = () => {
        const tuneAccesses: TuneAccess[] = selectedUsers.flatMap(user =>
            selectedTunes.map(tune => ({
                userId: user.id!,
                accessRef: tune.ref
            }))
        );
        assignAccess(tuneAccesses).then(() => {
            setSelectedUsers([]);
            modals.closeAll();
            onSave();
        });
    }

    const handleCancel = () => {
        modals.closeAll();
        setSelectedUsers([]);
    }

    useEffect(() => {
        fetchData();
        return () => cancelSource.cancel();
    }, []);

    const handleSelect = (user: User) => {
        const isSelected = !!selectedUsers.find(s => s.id === user.id);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter(s => s.id !== user.id));
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
    }

    return (
        <>
            <Text>
                {t("modal.assignAccess.content", {count: selectedTunes.length})}
            </Text>
            <Table
                my={"md"}
                withRowBorders={false}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th/>
                        <Table.Th>{t("user.id")}</Table.Th>
                        <Table.Th>{t("user.username")}</Table.Th>
                        <Table.Th>{t("user.role")}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map(user => (
                        <Table.Tr>
                            <Table.Td>
                                <Checkbox
                                    checked={!!selectedUsers.find(s => s.id === user.id)}
                                    onClick={() => handleSelect(user)}
                                /> </Table.Td>
                            <Table.Td>{user.id}</Table.Td>
                            <Table.Td>{user.username}</Table.Td>
                            <Table.Td>
                                {t(`role.${user?.role}`, {defaultValue: user?.role || "N/A"})}
                            </Table.Td>
                        </Table.Tr>))}
                </Table.Tbody>
            </Table>

            <Group justify={"end"} gap={4}>
                <CancelButton onClick={handleCancel}/>
                <SaveButton disabled={!selectedUsers.length} onClick={handleSave}/>
            </Group>
        </>
    );
}

export default AssignAccess;
