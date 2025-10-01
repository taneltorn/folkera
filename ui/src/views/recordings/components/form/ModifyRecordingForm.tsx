import React, {useEffect} from "react";
import {Grid, Group, Input, Select, TextInput} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Recording} from "../../../../model/Recording.ts";
import {useDataService} from "../../../../services/useDataService.ts";

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
            <Grid>
                <Grid.Col span={12}>
                    <Input.Wrapper label={t("recording.content")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.content")}
                            key={form.key('content')}
                            size={"md"}
                            {...form.getInputProps('content')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.tune")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.tune")}
                            key={form.key('tune')}
                            size={"md"}
                            {...form.getInputProps('tune')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
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
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.year")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.year")}
                            key={form.key('year')}
                            size={"md"}
                            {...form.getInputProps('year')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.collector")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.collector")}
                            key={form.key('collector')}
                            size={"md"}
                            {...form.getInputProps('collector')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.performer")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.performer")}
                            key={form.key('performer')}
                            size={"md"}
                            {...form.getInputProps('performer')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.instrument")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.instrument")}
                            key={form.key('instrument')}
                            size={"md"}
                            {...form.getInputProps('instrument')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.parish")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.parish")}
                            key={form.key('parish')}
                            size={"md"}
                            {...form.getInputProps('parish')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.county")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.county")}
                            key={form.key('county')}
                            size={"md"}
                            {...form.getInputProps('county')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.dance")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.dance")}
                            key={form.key('dance')}
                            size={"md"}
                            {...form.getInputProps('dance')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.origin")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.origin")}
                            key={form.key('origin')}
                            size={"md"}
                            {...form.getInputProps('origin')}
                        />
                    </Input.Wrapper>

                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.notes")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.notes")}
                            key={form.key('notes')}
                            size={"md"}
                            {...form.getInputProps('notes')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Input.Wrapper label={t("recording.comments")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.comments")}
                            key={form.key('comments')}
                            size={"md"}
                            {...form.getInputProps('comments')}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>

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
