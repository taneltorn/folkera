import React, {useEffect} from "react";
import {Group, Input, Select, TextInput, Title} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Recording} from "../../../../model/Recording.ts";
import {useDataService} from "../../../../services/useDataService.ts";
import {NotificationType} from "../../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../../hooks/useNotifications.tsx";

interface Properties {
    recording: Recording;
    variant?: string;
    size?: string;
    leftSection?: React.ReactNode;
    onChange?: () => void;
    children?: React.ReactNode;
}

const ModifyRecordingButton: React.FC<Properties> = ({recording, onChange, children, ...props}) => {

    const {t} = useTranslation();
    const {notify} = useNotifications();
    const dataService = useDataService();

    const form = useForm<Recording>({
        mode: 'uncontrolled',
        initialValues: {...recording},
        validate: {},
    });

    useEffect(() => {
        form.setValues({...recording});
    }, [recording]);

    const onSubmit = async (values: Recording) => {
        if (recording.id) {
            dataService
                .saveData([values])
                .then(() => {
                    onChange && onChange();
                    notify(t("toast.success.saveData"), NotificationType.SUCCESS);
                })
                .then(modals.closeAll);
        }
    }

    const openModifyRecordingModal = () =>
        modals.open({
            title: <Title order={4}>{t("modal.modifyRecording.title")}</Title>,
            size: "lg",
            children: (
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <Input.Wrapper label={t("recording.year")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.year")}
                            key={form.key('year')}
                            size={"md"}
                            {...form.getInputProps('year')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.tune")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.tune")}
                            key={form.key('tune')}
                            size={"md"}
                            {...form.getInputProps('tune')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.datatype")} mb={"md"} labelProps={{ms: "xs"}}>
                        <Select
                            withAsterisk
                            placeholder={t("recording.datatype")}
                            key={form.key('datatype')}
                            size={"md"}
                            data={[
                                {value: "", label: ""},
                                {value: "TR", label: "TR"},
                                {value: "TE", label: "TE"},
                                {value: "TX", label: "TX"},
                                {value: "TY", label: "TY"},
                            ]}
                            {...form.getInputProps('datatype')}
                        />
                    </Input.Wrapper>
                    
                    <Input.Wrapper label={t("recording.performer")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.performer")}
                            key={form.key('performer')}
                            size={"md"}
                            {...form.getInputProps('performer')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.instrument")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.instrument")}
                            key={form.key('instrument')}
                            size={"md"}
                            {...form.getInputProps('instrument')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.parish")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.parish")}
                            key={form.key('parish')}
                            size={"md"}
                            {...form.getInputProps('parish')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.origin")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.origin")}
                            key={form.key('origin')}
                            size={"md"}
                            {...form.getInputProps('origin')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.dance")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.dance")}
                            key={form.key('dance')}
                            size={"md"}
                            {...form.getInputProps('dance')}
                        />
                    </Input.Wrapper>
                    
                    <Input.Wrapper label={t("recording.collector")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.collector")}
                            key={form.key('collector')}
                            size={"md"}
                            {...form.getInputProps('collector')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.notes")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.notes")}
                            key={form.key('notes')}
                            size={"md"}
                            {...form.getInputProps('notes')}
                        />
                    </Input.Wrapper>

                    <Input.Wrapper label={t("recording.comments")} mb={"md"} labelProps={{ms: "xs"}}>
                        <TextInput
                            placeholder={t("recording.comments")}
                            key={form.key('comments')}
                            size={"md"}
                            {...form.getInputProps('comments')}
                        />
                    </Input.Wrapper>


                    <Group justify={"end"} gap={4}>
                        <Button type={"button"} onClick={modals.closeAll} variant={"subtle"}>
                            {t("button.cancel")}
                        </Button>
                        <Button type={"submit"}>
                            {t("button.save")}
                        </Button>
                    </Group>
                </form>
            ),
        });

    return (
        <Button
            size={props.size || "md"}
            variant={props.variant}
            leftSection={props.leftSection}
            onClick={openModifyRecordingModal}
        >
            {children}
        </Button>
    );
}

export default ModifyRecordingButton;
