import React from "react";
import {useTranslation} from "react-i18next";
import {User, UserRole} from "../../../../model/User.ts";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import FormInput from "../../../../components/form/FormInput.tsx";
import StandardFormControls from "../../notifications/components/StandardFormControls.tsx";
import {modals} from "@mantine/modals";
import UserFormTuneAccessTable from "./UserFormTuneAccessTable.tsx";

interface Properties {
    initialValues: User;
    onSubmit: (values: User) => void;
    isEdit?: boolean;
}

const UserForm: React.FC<Properties> = ({initialValues, onSubmit, isEdit}) => {

    const {t} = useTranslation();

    const form = useForm<User>({
        mode: "controlled",
        initialValues: {
            ...initialValues
        },
        validate: {
            email: isEmail(t("validation.invalidEmail")),
            name: isNotEmpty(t("validation.required")),
            username: isNotEmpty(t("validation.required")),
            password: (value) =>
                !isEdit
                    ? isNotEmpty(t("validation.required"))(value)
                    : null,
            accessRefs: (value) =>
                value.some(ref => !ref.trim())
                    ? t("validation.required")
                    : null,
        },
    });

    const handleSubmit = (values: User) => {
        const accessRefs = [
            ...new Set(
                values.accessRefs
                    .map(ref => ref.trim())
                    .filter(Boolean)
            )
        ];

        onSubmit({
            ...values,
            accessRefs
        });

        if (!isEdit) {
            form.reset();
        }
    };

    const handleAddAccessRef = () => {
        form.setFieldValue(
            "accessRefs",
            [...form.values.accessRefs, ""]
        );
    };

    const handleChangeAccessRef = (index: number, value: string) => {
        form.setFieldValue(
            `accessRefs.${index}`,
            value
        );
    };

    const handleRemoveAccessRef = (index: number) => {
        form.setFieldValue(
            "accessRefs",
            form.values.accessRefs.filter((_, i) => i !== index)
        );
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <FormInput
                name="username"
                disabled={isEdit}
                type="text"
                label={t("user.username")}
                placeholder={t("user.username")}
                form={form}
            />

            <FormInput
                name="name"
                type="text"
                label={t("user.name")}
                placeholder={t("user.name")}
                form={form}
            />

            <FormInput
                name="email"
                type="text"
                label={t("user.email")}
                placeholder={t("user.email")}
                form={form}
            />

            {!isEdit && (
                <FormInput
                    name="password"
                    type="text"
                    label={t("user.password")}
                    placeholder={t("user.password")}
                    form={form}
                />
            )}

            <FormInput
                name="role"
                type="radio"
                label={t("user.role")}
                options={[
                    UserRole.USER,
                    UserRole.RESEARCHER,
                    UserRole.ADMIN
                ].map(role => ({
                    value: role,
                    label: t(`role.${role}`)
                }))}
                form={form}
            />

            <UserFormTuneAccessTable
                accessRefs={form.values.accessRefs}
                error={form.errors.accessRefs}
                onAdd={handleAddAccessRef}
                onChange={handleChangeAccessRef}
                onRemove={handleRemoveAccessRef}
            />

            <StandardFormControls onCancel={modals.closeAll}/>
        </form>
    );
};

export default UserForm;