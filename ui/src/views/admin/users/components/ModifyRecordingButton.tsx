import React from "react";
import {Group, Input, TextInput} from "@mantine/core";
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {RiEdit2Fill} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Recording} from "../../../../model/Recording.ts";
import {useDataService} from "../../../../services/useDataService.tsx";
import {NotificationType} from "../../../../context/NotificationContext.tsx";
import {useNotifications} from "../../../../hooks/useNotifications.tsx";

interface Properties {
    recording: Recording;
    onChange: () => void;
}

const ModifyRecordingButton: React.FC<Properties> = ({recording, onChange}) => {

    const {t} = useTranslation();
    const {notify} = useNotifications();
    const dataService = useDataService();

    const form = useForm<Recording>({
        mode: 'uncontrolled',
        initialValues: {...recording},

        validate: {
        },
    });

    const onSubmit = async (values: Recording) => {
        if (recording.id) {
            dataService
                .saveData([values])
                .then(() => {
                    onChange();
                    notify(t("toast.success.saveData"), NotificationType.SUCCESS);
                })
                .then(modals.closeAll);
        }
    }

    const openModifyRecordingModal = () =>
        modals.open({
            title: t("modal.modifyRecording.title"),
            centered: true,
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
                        <TextInput
                            withAsterisk
                            placeholder={t("recording.datatype")}
                            key={form.key('datatype')}
                            size={"md"}
                            {...form.getInputProps('datatype')}
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
        <Button px={"xs"} onClick={openModifyRecordingModal} variant="subtle">
            <RiEdit2Fill size={Size.icon.SM}/>
        </Button>
    );
}

export default ModifyRecordingButton;
