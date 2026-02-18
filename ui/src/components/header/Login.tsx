import React from "react";
import {Button, Group, Modal, TextInput, useMantineTheme} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useForm, isNotEmpty} from '@mantine/form';
import {Size} from "../../utils/constants.ts";
import {MdOutlineLogin} from "react-icons/md";

interface LoginFormValues {
    usernameOrEmail: string;
    password: string;
}

const Login: React.FC = () => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {login} = useAuth();

    const [opened, {open, close}] = useDisclosure(false);

    const form = useForm<LoginFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            usernameOrEmail: '',
            password: '',
        },

        validate: {
            usernameOrEmail: isNotEmpty(t("validation.required")),
            password: isNotEmpty(t("validation.required")),
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        login(values.usernameOrEmail, values.password)
            .then(response => {
                if (response) {
                    close();
                }
            });
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={t("view.auth.form.header")}>
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <TextInput
                        mb={"md"}
                        variant={"filled"}
                        placeholder={t("view.auth.form.usernameOrEmail")}
                        key={form.key('usernameOrEmail')}
                        size={"lg"}
                        {...form.getInputProps('usernameOrEmail')}
                    />

                    <TextInput
                        variant={"filled"}
                        type={"password"}
                        placeholder={t("view.auth.form.password")}
                        key={form.key('password')}
                        size={"lg"}
                        {...form.getInputProps('password')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">
                            {t("view.auth.button.login")}
                        </Button>
                    </Group>
                </form>
            </Modal>

            <Button
                size={"sm"}
                variant="subtle"
                onClick={open}
                leftSection={<MdOutlineLogin color={theme.colors.red[9]} size={Size.icon.MD}/>}
            >
                {t("view.auth.button.login")}
            </Button>
        </>
    );
}

export default Login;
