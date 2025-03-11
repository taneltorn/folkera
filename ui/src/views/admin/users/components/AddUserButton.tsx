import React from "react";
import {useTranslation} from "react-i18next";
import useUserService from "../../../../services/useUserService.tsx";
import {Button, Group, Input, Radio, TextInput} from "@mantine/core";
import {User, UserRole} from "../../../../model/User.ts";
import {FaPlus} from "react-icons/fa";
import {modals} from "@mantine/modals";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";

interface Properties {
    onChange: () => void;
}

const AddUserButton: React.FC<Properties> = ({onChange}) => {

    const {t} = useTranslation();
    const userService = useUserService();

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
            .then(onChange)
            .then(modals.closeAll);
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
                        <Radio.Group
                            withAsterisk
                            {...form.getInputProps('role')}
                        >
                            <Radio mt={"xs"} value={UserRole.USER} label={t(`role.${UserRole.USER}`)} />
                            <Radio mt={"xs"} value={UserRole.ADMIN} label={t(`role.${UserRole.ADMIN}`)} />
                        </Radio.Group>
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

    return (
        <Button
            mt={"md"}
            variant={"subtle"}
            leftSection={<FaPlus/>}
            onClick={openCreateUserModal}>
            {t("button.addNew")}
        </Button>
    );
}

export default AddUserButton;
