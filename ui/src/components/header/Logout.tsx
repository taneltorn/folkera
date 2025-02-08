import React from "react";
import {Button} from "@mantine/core";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useTranslation} from "react-i18next";
import {MdOutlineLogout} from "react-icons/md";

const Logout: React.FC = () => {

    const {t} = useTranslation();
    const {logout} = useAuth();

    return (

        <Button
            size={"xs"}
            variant="subtle"
            leftSection={<MdOutlineLogout size={24}/>}
            onClick={logout}
        >
            {t("view.auth.button.logout")}
        </Button>
    );
}

export default Logout;
