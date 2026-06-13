import React from 'react';
import {Button, Group} from "@mantine/core";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {PiPassword} from 'react-icons/pi';
import {modals} from "@mantine/modals";
import {isNotEmpty, useForm} from "@mantine/form";
import useUserService from "../../../services/useUserService.ts";
import FormInput from "../../../components/form/FormInput.tsx";
import ModalTitle from "../../tunes/components/controls/ModalTitle.tsx";

const ChangePassword: React.FC = () => {

    const {t} = useTranslation();
    const auth = useAuth();
    const userService = useUserService();

    const form = useForm<{ password: string }>({
        mode: 'uncontrolled',
        initialValues: {
            password: ""
        },
        validate: {
            password: isNotEmpty(t("validation.required")),
        },
    });

    const onSubmit = async (values: { password: string }) => {
        if (!auth.currentUser?.id) {
            return;
        }

        userService.updateUserPassword(auth.currentUser.id, {...auth.currentUser, password: values.password})
            .then(() => {
                form.reset();
                modals.closeAll();
            });
    }

    const openModal = () =>
        modals.open({
            title: <ModalTitle title={t("modal.changePassword.title")}/>,
            centered: true,
            children: (
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <FormInput
                        name={"password"}
                        type={"password"}
                        label={t("modal.changePassword.newPassword")}
                        placeholder={t("modal.changePassword.newPassword")}
                        form={form}
                    />

                    <Group justify={"end"} gap={4} mt={"md"}>
                        <Button
                            radius={"xl"}
                            type={"button"}
                            color={"gray"}
                            variant={"subtle"}
                            onClick={modals.closeAll}
                        >
                            {t("button.cancel")}

                        </Button>
                        <Button type={"submit"} radius={"xl"}>
                            {t("button.save")}
                        </Button>
                    </Group>
                </form>
            ),
        });

    return (
        <Button
            radius={"xl"}
            leftSection={<PiPassword size={Size.icon.XS}/>}
            onClick={() => openModal()}>
            {t("page.profile.changePassword")}
        </Button>
    );
}

export default ChangePassword;
