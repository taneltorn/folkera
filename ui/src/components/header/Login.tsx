import React from "react";
import {Button, Group, Modal, TextInput, useMantineTheme} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useForm, isNotEmpty, isEmail} from '@mantine/form';
import {Size} from "../../utils/constants.ts";
import {MdOutlineLogin} from "react-icons/md";

interface LoginFormValues {
    email: string;
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
            email: '',
            password: '',
        },

        validate: {
            email: isEmail(t("validation.invalidEmail")),
            password: isNotEmpty(t("validation.required")),
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        login(values.email, values.password)
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
                        withAsterisk
                        placeholder={t("view.auth.form.email")}
                        key={form.key('email')}
                        size={"lg"}
                        {...form.getInputProps('email')}
                    />

                    <TextInput
                        withAsterisk
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
