import React from 'react';
import {Link} from "react-router-dom";
import Navigation from "./Navigation.tsx";
import Logo from "./Logo.tsx";
import {Group, Text, useMantineTheme} from "@mantine/core";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import CheckmarkAnimation from "../CheckmarkAnimation.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {useModifications} from "../../hooks/useModifications.tsx";
import {RiErrorWarningFill} from "react-icons/ri";
import {Size} from "../../utils/common.constants.ts";

const Header: React.FC = () => {

    const theme = useMantineTheme();
    const {activeNotification} = useNotifications();
    const {modifications} = useModifications();

    return (
        <Group justify={"space-between"} bg={theme.primaryColor[1]} px={"md"} py={"xs"}>
            <Group>
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <Navigation/>
            </Group>

            {activeNotification &&
                <Group>
                    {activeNotification.type === NotificationType.SUCCESS && <CheckmarkAnimation/>}
                    <Text c={"green.9"}>{activeNotification.message}</Text>
                </Group>}

            {!activeNotification && modifications.length > 0 &&
                <Group>
                    <RiErrorWarningFill color={theme.colors.red[9]} size={Size.icon.MD} />
                    <Text c={"red.9"}>{"Salvestamata muudatused"}</Text>
                </Group>}
        </Group>
    );
}

export default Header;
