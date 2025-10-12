import React from "react";
import {Group} from "@mantine/core";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Recording} from "../../../../model/Recording.ts";
import {BulkModifyFields} from "../../../../model/BulkModifyFields.ts";
import FormInput from "../../../../components/form/FormInput.tsx";

interface Properties {
    selection: Recording[];
    onSubmit: (values: BulkModifyFields) => void;
    onCancel: () => void;
}


const BulkModifyRecordingsForm: React.FC<Properties> = ({onSubmit, onCancel}) => {

    const {t} = useTranslation();

    const form = useForm<BulkModifyFields>({
        mode: 'uncontrolled',
        initialValues: {
            tune: "",
            trainset: "",
        },
        validate: {},
    });


    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <FormInput
                name={"tune"}
                type={"text"}
                label={t("recording.tune")}
                placeholder={t("recording.tune")}
                form={form}
            />

            <FormInput
                name={"trainset"}
                type={"select"}
                label={t("recording.trainset")}
                placeholder={t("recording.trainset")}
                options={[
                    {value: "", label: ""},
                    {value: "TR", label: "TR"},
                    {value: "TE", label: "TE"},
                ]}
                form={form}
            />

            <Group justify={"end"} gap={4} mt={"md"}>
                <Button type={"button"} onClick={onCancel} variant={"subtle"}>
                    {t("button.cancel")}
                </Button>
                <Button type={"submit"}>
                    {t("button.assign")}
                </Button>
            </Group>
        </form>
    );
}

export default BulkModifyRecordingsForm;
