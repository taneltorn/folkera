import React from "react";
import {Group} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {isNotEmpty, useForm} from "@mantine/form";
import FormInput from "../../../../components/form/FormInput.tsx";
import {Notification} from "../../../../model/Notification.ts";

interface Properties {
    initialValues: Notification;
    onSubmit: (values: Notification) => void;
    resetOnSubmit?: boolean;
}

const NotificationForm: React.FC<Properties> = ({initialValues, onSubmit, resetOnSubmit}) => {

    const {t} = useTranslation();

    const form = useForm<Notification>({
        mode: 'uncontrolled',
        initialValues: {...initialValues,
            validFrom: initialValues.validFrom ? new Date(initialValues.validFrom) : null,
            validTo: initialValues.validTo ? new Date(initialValues.validTo) : null,
        },
        validate: {
            title: isNotEmpty(t("validation.required")),
            message: isNotEmpty(t("validation.required")),
        },
    });

    const handleSubmit = (values: Notification) => {
        onSubmit(values);
        if (resetOnSubmit) {
            form.reset();
        }
    }

    return (

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <FormInput
                name={"title"}
                type={"text"}
                label={t("notification.title")}
                placeholder={t("notification.title")}
                form={form}
            />

            <FormInput
                name={"message"}
                type={"textarea"}
                label={t("notification.message")}
                placeholder={t("notification.message")}
                form={form}
            />

            <FormInput
                name={"validFrom"}
                type={"datetime"}
                label={t("notification.validFrom")}
                placeholder={t("notification.validFrom")}
                form={form}
            />

            <FormInput
                name={"validTo"}
                type={"datetime"}
                label={t("notification.validTo")}
                placeholder={t("notification.validTo")}
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

export default NotificationForm;
