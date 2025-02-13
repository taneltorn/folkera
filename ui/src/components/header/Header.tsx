import React from 'react';
import {Link} from "react-router-dom";
import Navigation from "./Navigation.tsx";
import Logo from "./Logo.tsx";
import {Button, Group} from "@mantine/core";
import {useAuth} from "../../hooks/useAuth.tsx";
import Login from "./Login.tsx";
import Logout from "./Logout.tsx";
import {RxCheck, RxCross2} from "react-icons/rx";
import {Size} from "../../utils/constants.ts";
import {useModifications} from "../../hooks/useModifications.tsx";
import {useDataContext} from "../../hooks/useDataContext.tsx";
import {useTranslation} from "react-i18next";

const Header: React.FC = () => {

    const {t} = useTranslation();
    const auth = useAuth();
    const {modifications, clearModifications} = useModifications();
    const {saveData, loadData} = useDataContext();

    const handleSave = () => {
        saveData(modifications);
        clearModifications();
    };

    const handleClear = () => {
        loadData();
        clearModifications();
    };
    
    return (
        <Group justify={"space-between"} px={"md"} py={"xs"}>
            <Group>
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <Navigation/>
            </Group>

            <Group gap={0}>
                {modifications.length > 0 && <>
                    <Button
                        variant={"subtle"}
                        size={"xs"}
                        color={"gray.7"}
                        leftSection={<RxCross2 size={Size.icon.MD}/>}
                        onClick={handleClear}>
                        {t("view.recordings.controls.clear")}
                    </Button>
                    <Button
                        variant={"subtle"}
                        size={"xs"}
                        color={"green"}
                        leftSection={<RxCheck size={Size.icon.MD}/>}
                        onClick={handleSave}>
                        {t("view.recordings.controls.save")}
                    </Button>
                </>}
            <Group>
                {!auth.currentUser?.email ? <Login/> : <Logout/>}
            </Group>
            </Group>
        </Group>
    );
}

export default Header;
