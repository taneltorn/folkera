import React, {useEffect} from "react";
import {Group, SimpleGrid} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Tune} from "../../../../model/Tune.ts";
import {useTuneService} from "../../../../services/useTuneService.ts";
import FormInput from "../../../../components/form/FormInput.tsx";

interface Properties {
    initialValues: Tune;
    onSubmit?: () => void;
}

const ModifyTuneForm: React.FC<Properties> = ({initialValues, ...props}) => {

    const {t} = useTranslation();
    const dataService = useTuneService();

    const form = useForm<Tune>({
        mode: 'uncontrolled',
        initialValues: {...initialValues},
        validate: {},
    });

    const onSubmit = async (values: Tune) => {
        if (values.id) {
            dataService
                .saveTunes([values])
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
                    label={t("tune.content")}
                    placeholder={t("tune.content")}
                    form={form}
                />
            </SimpleGrid>
            <SimpleGrid cols={2}>
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
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"year"}
                    type={"text"}
                    label={t("tune.year")}
                    placeholder={t("tune.year")}
                    form={form}
                />
                <FormInput
                    name={"collector"}
                    type={"text"}
                    label={t("tune.collector")}
                    placeholder={t("tune.collector")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"performer"}
                    type={"text"}
                    label={t("tune.performer")}
                    placeholder={t("tune.performer")}
                    form={form}
                />
                <FormInput
                    name={"instrument"}
                    type={"text"}
                    label={t("tune.instrument")}
                    placeholder={t("tune.instrument")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"parish"}
                    type={"text"}
                    label={t("tune.parish")}
                    placeholder={t("tune.parish")}
                    form={form}
                />
                <FormInput
                    name={"county"}
                    type={"text"}
                    label={t("tune.county")}
                    placeholder={t("tune.county")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"dance"}
                    type={"text"}
                    label={t("tune.dance")}
                    placeholder={t("tune.dance")}
                    form={form}
                />
                <FormInput
                    name={"origin"}
                    type={"text"}
                    label={t("tune.origin")}
                    placeholder={t("tune.origin")}
                    form={form}
                />
            </SimpleGrid>

            <SimpleGrid cols={2}>
                <FormInput
                    name={"notes"}
                    type={"text"}
                    label={t("tune.notes")}
                    placeholder={t("tune.notes")}
                    form={form}
                />
                <FormInput
                    name={"comments"}
                    type={"text"}
                    label={t("tune.comments")}
                    placeholder={t("tune.comments")}
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

export default ModifyTuneForm;
