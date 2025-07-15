import React from 'react';
import {Button, Group, TextInput} from "@mantine/core";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {PiPassword} from 'react-icons/pi';
import {modals} from "@mantine/modals";
import {isNotEmpty, useForm} from "@mantine/form";
import useUserService from "../../services/useUserService.ts";

const ChangePassword: React.FC = () => {

    const {t} = useTranslation();
    const auth = useAuth();
    const userService = useUserService();

    const form = useForm<{ password: string }>({
        mode: 'uncontrolled',
        initialValues: {
            password: ""
        },
        validate: {
            password: isNotEmpty(t("validation.required")),
        },
    });

    const onSubmit = async (values: { password: string }) => {
        if (!auth.currentUser?.id) {
            return;
        }

        userService.updateUserPassword(auth.currentUser.id, {...auth.currentUser, password: values.password})
            .then(() => {
                form.reset();
                modals.closeAll();
            });
    }

    const openChangePasswordModal = () =>
        modals.open({
            title: t("modal.changePassword.title"),
            centered: true,
            children: (
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>

                    <TextInput
                        withAsterisk
                        type={"password"}
                        placeholder={t("modal.changePassword.newPassword")}
                        key={form.key('password')}
                        size={"md"}
                        {...form.getInputProps('password')}
                    />

                    <Group justify={"end"} gap={4} mt={"md"}>
                        <Button type={"button"} onClick={modals.closeAll} variant={"subtle"}>
                            {t("button.cancel")}

                        </Button>
                        <Button type={"submit"}>
                            {t("button.save")}
                        </Button>
                    </Group>
                </form>
            ),
        });

    return (
        <Button
            leftSection={<PiPassword size={Size.icon.XS}/>}
            onClick={() => openChangePasswordModal()}>
            {t("page.userMenu.changePassword")}
        </Button>
    );
}

export default ChangePassword;
