import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    Button,
    Group,
    Drawer,
    Burger,
    Box,
    Stack,
} from "@mantine/core";
import {FaDatabase} from "react-icons/fa";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Size} from "../../utils/constants.ts";
import Login from "./Login.tsx";
import UserMenu from "./UserMenu.tsx";
import Help from "./Help.tsx";
import {TbZoomQuestion} from "react-icons/tb";

const routes = [
    {id: "recordings", icon: <FaDatabase size={Size.icon.XS}/>, link: "/recordings?view=table"},
    {id: "identify", icon: <TbZoomQuestion size={Size.icon.MD}/>, link: "/identify"},
];

const Navigation: React.FC = () => {
    const [t] = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const [drawerOpened, setDrawerOpened] = useState(false);

    const navMenu = routes.map((item, index) => (
        <Button
            key={index}
            size={"sm"}
            leftSection={item.icon}
            variant={location.pathname.startsWith(item.link.split("?")[0]) ? "filled" : "subtle"}
            onClick={() => {
                navigate(item.link);
                setDrawerOpened(false);
            }}
        >
            {t(`page.navigation.${item.id}`)}
        </Button>));

    const userMenu = <>
        <Help/>
        {!auth.currentUser?.email
            ? <Login/>
            : <UserMenu/>}
    </>;

    return (
        <>
            <Box visibleFrom="sm" flex={1}>
                <Group justify={"space-between"}>
                    <Group gap={4}>
                        {navMenu}
                    </Group>
                    <Group gap={4}>
                        {userMenu}
                    </Group>
                </Group>
            </Box>

            <Group hiddenFrom={"sm"} flex={1} justify={"end"}>
                <Burger
                    opened={drawerOpened}
                    lineSize={2}
                    size={"md"}
                    color={"red"}
                    onClick={() => setDrawerOpened((o) => !o)}
                    aria-label="Toggle navigation"
                />
            </Group>
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title={t("page.navigation.title")}
                padding="md"
                size="xs"
            >
                <Stack>
                    {navMenu}
                    {userMenu}
                </Stack>
            </Drawer>
        </>
    );
};

export default Navigation;
