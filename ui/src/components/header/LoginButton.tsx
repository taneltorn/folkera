import React from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Size} from "../../utils/constants.ts";
import {MdOutlineLogin} from "react-icons/md";
import {modals} from "@mantine/modals";
import ModalTitle from "../../views/tunes/components/controls/ModalTitle.tsx";
import LoginForm from "./LoginForm.tsx";
import {useDataContext} from "../../hooks/useDataContext.tsx";

const LoginButton: React.FC = () => {

    const {t} = useTranslation();
    const {loadData} = useDataContext();

    const onLogin = () => {
        modals.closeAll();
        loadData();
    }

    const openModal = () =>
        modals.open({
            title: <ModalTitle title={t("page.auth.form.header")}/>,
            centered: true,
            size: "xs",
            children: (<>
                    <LoginForm onSubmit={onLogin}/>
                </>
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
