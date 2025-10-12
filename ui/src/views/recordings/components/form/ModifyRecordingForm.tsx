import React, {useEffect} from "react";
import {Group, SimpleGrid} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Recording} from "../../../../model/Recording.ts";
import {useDataService} from "../../../../services/useDataService.ts";
import FormInput from "../../../../components/form/FormInput.tsx";

interface Properties {
    initialValues: Recording;
    onSubmit?: () => void;
}

const ModifyRecordingForm: React.FC<Properties> = ({initialValues, ...props}) => {

    const {t} = useTranslation();
    const dataService = useDataService();

    const form = useForm<Recording>({
        mode: 'uncontrolled',
        initialValues: {...initialValues},
        validate: {},
    });

    const onSubmit = async (values: Recording) => {
        if (values.id) {
            dataService
                .saveData([values])
                .then(() => {
                    props.onSubmit && props.onSubmit();
                })
                .then(modals.closeAll);
        }
    }

    useEffect(() => {
        form.setValues({...initialValues});
    }, [initialValues]);

    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <SimpleGrid cols={1}>
                <FormInput
                    name={"content"}
                    type={"text"}
                    label={t("recording.content")}
                    placeholder={t("recording.content")}
                    form={form}
                />
            </SimpleGrid>
            <SimpleGrid cols={2}>
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
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"year"}
                    type={"text"}
                    label={t("recording.year")}
                    placeholder={t("recording.year")}
                    form={form}
                />
                <FormInput
                    name={"collector"}
                    type={"text"}
                    label={t("recording.collector")}
                    placeholder={t("recording.collector")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"performer"}
                    type={"text"}
                    label={t("recording.performer")}
                    placeholder={t("recording.performer")}
                    form={form}
                />
                <FormInput
                    name={"instrument"}
                    type={"text"}
                    label={t("recording.instrument")}
                    placeholder={t("recording.instrument")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"parish"}
                    type={"text"}
                    label={t("recording.parish")}
                    placeholder={t("recording.parish")}
                    form={form}
                />
                <FormInput
                    name={"county"}
                    type={"text"}
                    label={t("recording.county")}
                    placeholder={t("recording.county")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"dance"}
                    type={"text"}
                    label={t("recording.dance")}
                    placeholder={t("recording.dance")}
                    form={form}
                />
                <FormInput
                    name={"origin"}
                    type={"text"}
                    label={t("recording.origin")}
                    placeholder={t("recording.origin")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"notes"}
                    type={"text"}
                    label={t("recording.notes")}
                    placeholder={t("recording.notes")}
                    form={form}
                />
                <FormInput
                    name={"comments"}
                    type={"text"}
                    label={t("recording.comments")}
                    placeholder={t("recording.comments")}
                    form={form}
                />
            </SimpleGrid>

            <Group justify={"end"} gap={4} mt={"md"}>
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

export default ModifyRecordingForm;
