import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Group} from "@mantine/core";
import {User, UserRole} from "../../../../model/User.ts";
import {modals} from "@mantine/modals";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import FormInput from "../../../../components/form/FormInput.tsx";

interface Properties {
    initialValues: User;
    onSubmit: (values: User) => void;
    isEdit?: boolean;
}

const UserForm: React.FC<Properties> = ({initialValues, onSubmit, isEdit}) => {

    const {t} = useTranslation();

    const form = useForm<User>({
        mode: 'uncontrolled',
        initialValues: {...initialValues},
        validate: {
            email: isEmail(t("validation.invalidEmail")),
            name: isNotEmpty(t("validation.required")),
            username: isNotEmpty(t("validation.required")),
            password: (value) => (!isEdit ? isNotEmpty(t("validation.required"))(value) : null),
        },
    });

    const handleSubmit = (values: User) => {
        onSubmit(values);
        if (!isEdit) {
            form.reset();
        }
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <FormInput
                name={"name"}
                type={"text"}
                label={t("user.name")}
                placeholder={t("user.name")}
                form={form}
            />

            <FormInput
                name={"username"}
                type={"text"}
                label={t("user.username")}
                placeholder={t("user.username")}
                form={form}
            />

            <FormInput
                name={"email"}
                type={"text"}
                label={t("user.email")}
                placeholder={t("user.email")}
                form={form}
            />

            {!isEdit &&
                <FormInput
                    name={"password"}
                    type={"text"}
                    label={t("user.password")}
                    placeholder={t("user.password")}
                    form={form}
                />}

            <FormInput
                name={"role"}
                type={"radio"}
                label={t("user.role")}
                options={[
                    {value: UserRole.USER, label: t(`role.${UserRole.USER}`)},
                    {value: UserRole.ADMIN, label: t(`role.${UserRole.ADMIN}`)}
                ]}
                form={form}
            />

            <Group justify={"end"} gap={4}>
                <Button type={"button"} onClick={modals.closeAll} variant={"subtle"}>
                    {t("button.cancel")}
                </Button>
                <Button type={"submit"}>
                    {t("button.save")}
                </Button>
            </Group>
        </form>
    );
}

export default UserForm;
