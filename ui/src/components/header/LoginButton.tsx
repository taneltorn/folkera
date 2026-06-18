import React from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Size} from "../../utils/constants.ts";
import {MdOutlineLogin} from "react-icons/md";
import {modals} from "@mantine/modals";
import ModalTitle from "../../views/tunes/components/controls/ModalTitle.tsx";
import LoginForm from "./LoginForm.tsx";

const LoginButton: React.FC = () => {

    const {t} = useTranslation();

    const openModal = () =>
        modals.open({
            title: <ModalTitle title={t("page.auth.form.header")}/>,
            centered: true,
            children: (
                <LoginForm onSubmit={modals.closeAll}/>
            ),
        });

    return (
        <Button
            size={"sm"}
            radius={"xl"}
            variant="subtle"
            onClick={openModal}
            leftSection={<MdOutlineLogin size={Size.icon.MD}/>}
        >
            {t("page.navigation.login")}
        </Button>
    );
}

export default LoginButton;
