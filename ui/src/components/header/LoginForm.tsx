import React from "react";
import {Button, Group, TextInput} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useForm, isNotEmpty} from '@mantine/form';

interface LoginFormValues {
    usernameOrEmail: string;
    password: string;
}

interface Properties {
    onSubmit: () => void;
}

const Login: React.FC<Properties> = ({onSubmit}) => {

    const {t} = useTranslation();
    const {login} = useAuth();

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

    const handleSubmit = async (values: LoginFormValues) => {
        login(values.usernameOrEmail, values.password)
            .then(response => {
                if (response) {
                    onSubmit();
                }
            });
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
    );
}

export default Login;
