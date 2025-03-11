import React from "react";
import {Group, Table} from "@mantine/core";
import {User} from "../../../../model/User.ts";
import {useTranslation} from "react-i18next";
import moment from "moment";
import ModifyUserButton from "./ModifyUserButton.tsx";
import RemoveUserButton from "./RemoveUserButton.tsx";

interface Properties {
    user: User;
    onChange: () => void;
}

const UserRow: React.FC<Properties> = ({user, onChange}) => {

    const {t} = useTranslation();

    return (
        <Table.Tr>
            <Table.Td>{user.id}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>
                {t(`role.${user?.role}`, {defaultValue: user?.role || "N/A"})}
            </Table.Td>
            <Table.Td>
                {moment(user.createdAt).format("DD.MM.YYYY")}
            </Table.Td>
            <Table.Td>
                <Group gap={4} justify={"end"} wrap={"nowrap"}>
                    <ModifyUserButton user={user} onChange={onChange}/>
                    <RemoveUserButton user={user} onChange={onChange}/>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default UserRow;
