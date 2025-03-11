import React from 'react';
import {Button, Divider, Group, Menu, Text, useMantineTheme} from "@mantine/core";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {FaUser, FaUserCircle} from "react-icons/fa";
import {MdAdminPanelSettings, MdOutlineLogout} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {UserRole} from "../../model/User.ts";

const UserMenu: React.FC = () => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    leftSection={<FaUserCircle size={Size.icon.MD}/>}
                >
                    {auth.currentUser?.name?.split(' ')[0]}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {auth.currentUser?.role === UserRole.ADMIN &&
                    <Menu.Item onClick={() => navigate("/admin")} py={"xs"}>
                        <Group gap={"xs"}>
                            <MdAdminPanelSettings size={Size.icon.SM}/>
                            <Text size={"sm"} fw={"bold"}>
                                {t("page.userMenu.admin")}
                            </Text>
                        </Group>
                    </Menu.Item>}
                <Menu.Item onClick={() => navigate("/profile")} py={"xs"}>
                    <Group gap={"xs"}>
                        <FaUser size={Size.icon.XS}/>
                        <Text size={"sm"} fw={"bold"}>
                            {t("page.userMenu.myProfile")}
                        </Text>
                    </Group>
                </Menu.Item>
                <Divider my={"xs"}/>

                <Menu.Item onClick={auth.logout} py={"xs"}>
                    <Group gap={"xs"}>
                        <MdOutlineLogout color={theme.colors.red[9]} size={Size.icon.SM}/>
                        <Text c={"red.9"} size={"sm"} fw={"bold"}>
                            {t("view.auth.button.logout")}
                        </Text>
                    </Group>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default UserMenu;
