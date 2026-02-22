import React from "react";
import {Group} from "@mantine/core";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Tune} from "../../../../model/Tune.ts";
import {BulkModifyFields} from "../../../../model/BulkModifyFields.ts";
import FormInput from "../../../../components/form/FormInput.tsx";

interface Properties {
    selection: Tune[];
    onSubmit: (values: BulkModifyFields) => void;
    onCancel: () => void;
}


const BulkModifyTunesForm: React.FC<Properties> = ({onSubmit, onCancel}) => {

    const {t} = useTranslation();

    const form = useForm<BulkModifyFields>({
        mode: 'uncontrolled',
        initialValues: {
            melody: "",
            trainset: "",
        },
        validate: {},
    });


    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <FormInput
                name={"tune"}
                type={"text"}
                label={t("tune.melody")}
                placeholder={t("tune.melody")}
                form={form}
            />

            <FormInput
                name={"trainset"}
                type={"select"}
                label={t("tune.trainset")}
                placeholder={t("tune.trainset")}
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

export default BulkModifyTunesForm;
