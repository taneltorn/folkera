import React from 'react';
import {Link} from "react-router-dom";
import Navigation from "./Navigation.tsx";
import Logo from "./Logo.tsx";
import {Group, Text, useMantineTheme} from "@mantine/core";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import CheckmarkAnimation from "../CheckmarkAnimation.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";

const Header: React.FC = () => {

    const theme = useMantineTheme();
    const {activeNotification} = useNotifications();

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
        </Group>
    );
}

export default Header;
