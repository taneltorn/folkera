import React from "react";
import {Group, Input, Table, TextInput} from "@mantine/core";
import {User} from "../../../../model/User.ts";
import {Button, Text} from '@mantine/core';
import {modals} from '@mantine/modals';
import {RiDeleteBinLine, RiEdit2Fill} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import useUserService from "../../../../services/useUserService.tsx";
import {isNotEmpty, useForm} from "@mantine/form";

interface Properties {
    user: User;
    onChange: () => void;
}

const UserRow: React.FC<Properties> = ({user, onChange}) => {

    const {t} = useTranslation();
    const userService = useUserService();

    const {removeUser} = useUserService();

    const form = useForm<User>({
        mode: 'uncontrolled',
        initialValues: {...user},

        validate: {
            name: isNotEmpty(t("field.required")),
        },
    });

    const onSubmit = async (values: User) => {
        if (user.id) {
            userService
                .updateUser(user.id, values)
                .then(onChange)
                .then(modals.closeAll);
        }
    }

    const openModifyUserModal = () =>
        modals.open({
            title: t("modal.modifyUser.title"),
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
                            {t("modal.modifyUser.cancel")}

                        </Button>
                        <Button type={"submit"}>
                            {t("modal.modifyUser.submit")}
                        </Button>
                    </Group>
                </form>
            ),
        });


    const openRemoveUserModal = () =>
        modals.openConfirmModal({
            title: t("modal.removeUser.title"),
            centered: true,
            children: (
                <Text size={"sm"}>
                    {t("modal.removeUser.content")}
                </Text>
            ),
            labels: {
                confirm: t("modal.removeUser.confirm"),
                cancel: t("modal.removeUser.cancel")
            },
            confirmProps: {color: 'red'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => user.id && removeUser(user.id).then(onChange),
        });

    return (
        <Table.Tr>
            <Table.Td>{user.id}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>
                {user.role}
            </Table.Td>
            <Table.Td>
                <Group gap={4}>
                    <Button px={"xs"} onClick={openModifyUserModal} variant="light">
                        <RiEdit2Fill size={Size.icon.SM}/>
                    </Button>
                    <Button px={"xs"} onClick={openRemoveUserModal} variant="light">
                        <RiDeleteBinLine size={Size.icon.SM}/>
                    </Button>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default UserRow;
