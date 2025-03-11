import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import UserRow from "./components/UserRow.tsx";
import useUserService from "../../../services/useUserService.tsx";
import {Table} from "@mantine/core";
import {User} from "../../../model/User.ts";
import AddUserButton from "./components/AddUserButton.tsx";

const UserList: React.FC = () => {

    const {t} = useTranslation();
    const {fetchUsers, cancelSource} = useUserService();

    const [users, setUsers] = useState<User[]>([]);

    const fetchData = () => {
        fetchUsers().then(setUsers);
    }

    useEffect(() => {
        fetchData();
        return () => cancelSource.cancel();
    }, []);

    return (<>
        <Table mt={"md"}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>{t("user.id")}</Table.Th>
                    <Table.Th>{t("user.email")}</Table.Th>
                    <Table.Th>{t("user.name")}</Table.Th>
                    <Table.Th>{t("user.role")}</Table.Th>
                    <Table.Th>{t("user.createdAt")}</Table.Th>
                    <Table.Th/>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {users.map((user) => (
                    <UserRow
                        key={user.id}
                        user={user}
                        onChange={fetchData}
                    />))}
            </Table.Tbody>
        </Table>

        <AddUserButton onChange={fetchData}/>
    </>);
}

export default UserList;
