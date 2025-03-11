import React from "react";
import {Group, Input, Radio, TextInput} from "@mantine/core";
import {User, UserRole} from "../../../../model/User.ts";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import { RiEdit2Fill} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import useUserService from "../../../../services/useUserService.tsx";
import {isNotEmpty, useForm} from "@mantine/form";

interface Properties {
    user: User;
    onChange: () => void;
}

const ModifyUserButton: React.FC<Properties> = ({user, onChange}) => {

    const {t} = useTranslation();
    const userService = useUserService();

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
                .modifyUser(user.id, values)
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

                    <Input.Wrapper label={t("user.role")} mb={"md"} labelProps={{ms: "xs"}}>
                        <Radio.Group
                            withAsterisk
                            {...form.getInputProps('role')}
                        >
                            <Radio mt={"xs"} value={UserRole.USER} label={t(`role.${UserRole.USER}`)}/>
                            <Radio mt={"xs"} value={UserRole.ADMIN} label={t(`role.${UserRole.ADMIN}`)}/>
                        </Radio.Group>
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

    return (
        <Button px={"xs"} onClick={openModifyUserModal} variant="light">
            <RiEdit2Fill size={Size.icon.SM}/>
        </Button>
    );
}

export default ModifyUserButton;
