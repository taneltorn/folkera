import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import UserRow from "./components/UserRow.tsx";
import useUserService from "../../../services/useUserService.ts";
import {Box, CloseButton, Input, LoadingOverlay, Table} from "@mantine/core";
import {User} from "../../../model/User.ts";
import AddUserButton from "./components/AddUserButton.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {Size} from "../../../utils/constants.ts";
import {useFocusWithin} from "@mantine/hooks";
import NoData from "../../tunes/table/components/NoData.tsx";

const UserList: React.FC = () => {

    const {t} = useTranslation();
    const {fetchUsers, isLoading, cancelSource} = useUserService();
    const {ref, focused} = useFocusWithin();

    const [search, setSearch] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const fetchData = () => {
        fetchUsers().then(result => {
            setUsers(result);
            setFilteredUsers(result);
        });
    }

    useEffect(() => {
        fetchData();
        return () => cancelSource.cancel();
    }, []);

    useEffect(() => {
        const filtered = users.filter(u => !search || u.username.includes(search))
        setFilteredUsers(filtered);
    }, [search, users]);

    return (
        <Box mt={"md"} pos={"relative"}>
            <Input
                ref={ref}
                radius={"lg"}
                w={300}
                autoComplete={"off"}
                id={focused ? "search-input-focused" : ""}
                className={"search-input"}
                size={"md"}
                value={search}
                leftSection={<IoSearchOutline size={Size.icon.MD}/>}
                placeholder={t("page.tunes.controls.search")}
                onChange={e => setSearch(e.currentTarget.value)}
                rightSectionPointerEvents="all"
                rightSection={
                    <CloseButton
                        variant={"transparent"}
                        onClick={() => setSearch("")}
                        style={{display: search ? undefined : 'none'}}
                    />
                }
            />

            <Table
                my={"md"}
                withRowBorders={false}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>{t("user.id")}</Table.Th>
                        <Table.Th>{t("user.username")}</Table.Th>
                        <Table.Th>{t("user.email")}</Table.Th>
                        <Table.Th>{t("user.name")}</Table.Th>
                        <Table.Th>{t("user.role")}</Table.Th>
                        <Table.Th>{t("user.createdAt")}</Table.Th>
                        <Table.Th/>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredUsers.map(user => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onChange={fetchData}
                        />))}
                </Table.Tbody>
            </Table>
            <NoData show={!isLoading && !filteredUsers.length}/>

            <AddUserButton onChange={fetchData}/>

            <LoadingOverlay visible={isLoading} />
        </Box>
    );
}

export default UserList;
