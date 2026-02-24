import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Size} from "../../utils/constants.ts";
import {MdOutlineLogin} from "react-icons/md";
import {modals} from "@mantine/modals";
import ModalTitle from "../../views/tunes/components/controls/ModalTitle.tsx";
import LoginForm from "./LoginForm.tsx";

const LoginButton: React.FC = () => {

    const {t} = useTranslation();
    const theme = useMantineTheme();

    const openModal = () =>
        modals.open({
            title: <ModalTitle title={t("view.auth.form.header")}/>,
            centered: true,
            children: (
                <LoginForm onSubmit={modals.closeAll}/>
            ),
        });

    return (
        <Button
            size={"sm"}
            variant="subtle"
            onClick={openModal}
            leftSection={<MdOutlineLogin color={theme.colors.red[9]} size={Size.icon.MD}/>}
        >
            {t("view.auth.button.login")}
        </Button>
    );
}

export default LoginButton;
