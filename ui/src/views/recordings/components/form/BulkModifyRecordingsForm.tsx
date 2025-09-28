import React from "react";
import {Group, Input, Select, TextInput} from "@mantine/core";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Recording} from "../../../../model/Recording.ts";
import {BulkModifyFields} from "../../../../model/BulkModifyFields.ts";

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
            <Input.Wrapper label={t("recording.tune")} mb={"md"} labelProps={{ms: "xs"}}>
                <TextInput
                    withAsterisk
                    placeholder={t("recording.tune")}
                    key={form.key('tune')}
                    size={"md"}
                    {...form.getInputProps('tune')}
                />
            </Input.Wrapper>
            <Input.Wrapper label={t("recording.trainset")} mb={"md"} labelProps={{ms: "xs"}}>
                <Select
                    withAsterisk
                    placeholder={t("recording.trainset")}
                    key={form.key('trainset')}
                    size={"md"}
                    clearable
                    data={[
                        {value: "", label: ""},
                        {value: "TR", label: "TR"},
                        {value: "TE", label: "TE"},
                    ]}
                    {...form.getInputProps('trainset')}
                />
            </Input.Wrapper>

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
