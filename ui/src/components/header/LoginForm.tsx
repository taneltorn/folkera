import React from "react";
import {Button, Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useForm, isNotEmpty} from '@mantine/form';
import FormInput from "../form/FormInput.tsx";

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
            <FormInput
                name={"usernameOrEmail"}
                type={"text"}
                size={"lg"}
                radius={"xl"}
                label={t("page.auth.form.usernameOrEmail")}
                placeholder={t("page.auth.form.usernameOrEmail")}
                form={form}
            />
            <FormInput
                name={"password"}
                type={"password"}
                size={"lg"}
                radius={"xl"}
                label={t("page.auth.form.password")}
                placeholder={t("page.auth.form.password")}
                form={form}
            />

            <Group justify="center" mt="xl">
                <Button
                    size={"lg"}
                    w={"100%"}
                    radius={"xl"}
                    type="submit">
                    {t("page.navigation.login")}
                </Button>
            </Group>
        </form>
    );
}

export default Login;
