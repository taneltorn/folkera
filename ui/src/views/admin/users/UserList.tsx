import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import UserRow from "./components/UserRow.tsx";
import useUserService from "../../../services/useUserService.tsx";
import {Button, Group, Input, Table, TextInput} from "@mantine/core";
import {User, UserRole} from "../../../model/User.ts";
import {FaPlus} from "react-icons/fa";
import {modals} from "@mantine/modals";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";

const UserList: React.FC = () => {

    const {t} = useTranslation();
    const {fetchUsers, cancelSource} = useUserService();
    const userService = useUserService();

    const [users, setUsers] = useState<User[]>([]);

    const form = useForm<User>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            name: '',
            password: '',
            role: UserRole.USER
        },
        validate: {
            email: isEmail(t("validation.invalidEmail")),
            password: isNotEmpty(t("validation.required")),
            name: isNotEmpty(t("validation.required")),
        },
    });

    const onSubmit = async (values: User) => {
        userService
            .createUser(values)
            .then(fetchUsers)
            .then(modals.closeAll);
    }

    const fetchData = () => {
        fetchUsers().then(setUsers);
    }

    const openCreateUserModal = () =>
        modals.open({
            title: t("modal.createUser.title"),
            centered: true,
            children: (
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <Input.Wrapper label={t("user.name")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("user.name")}
                            key={form.key('name')}
                            size={"md"}
                            {...form.getInputProps('name')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("user.email")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("user.email")}
                            key={form.key('email')}
                            size={"md"}
                            {...form.getInputProps('email')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("user.password")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            type={"password"}
                            placeholder={t("user.password")}
                            key={form.key('password')}
                            size={"md"}
                            {...form.getInputProps('password')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("user.role")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("user.role")}
                            key={form.key('role')}
                            size={"md"}
                            {...form.getInputProps('role')}
                        />
                    </Input.Wrapper>

                    <Group justify={"end"} gap={4}>
                        <Button type={"button"} onClick={modals.closeAll} variant={"subtle"}>
                            {t("modal.createUser.cancel")}
                        </Button>
                        <Button type={"submit"}>
                            {t("modal.createUser.submit")}
                        </Button>
                    </Group>
                </form>
            ),
        });

    useEffect(() => {
        fetchData();
        return () => cancelSource.cancel();
    }, []);

    return (<>
        <Table mt={"md"}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>{t("view.admin.users.table.id")}</Table.Th>
                    <Table.Th>{t("view.admin.users.table.email")}</Table.Th>
                    <Table.Th>{t("view.admin.users.table.name")}</Table.Th>
                    <Table.Th>{t("view.admin.users.table.role")}</Table.Th>
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

        <Button
            mt={"md"}
            variant={"subtle"}
            leftSection={<FaPlus/>}
            onClick={openCreateUserModal}>
            {t("button.addNew")}
        </Button>
    </>);
}

export default UserList;
