import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import useUserService from "../../../hooks/useUserService.ts";
import {Box, CloseButton, Input} from "@mantine/core";
import {User} from "../../../model/User.ts";
import AddUserButton from "./components/AddUserButton.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {Size} from "../../../utils/constants.ts";
import {useFocusWithin} from "@mantine/hooks";
import NoData from "../../tunes/table/components/NoData.tsx";
import Loading from "../../../components/Loading.tsx";
import UserTable from "./UserTable.tsx";

const UserList: React.FC = () => {

    const {t} = useTranslation();
    const {ref, focused} = useFocusWithin();
    const {fetchUsers, isLoading, cancelSource} = useUserService();

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
                mb={"md"}
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

            <UserTable users={filteredUsers} onChange={fetchData}/>

            <NoData show={!isLoading && !filteredUsers.length}/>

            <AddUserButton onChange={fetchData}/>

            <Loading isLoading={isLoading}/>
        </Box>
    );
}

export default UserList;
