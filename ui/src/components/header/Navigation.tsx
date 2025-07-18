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
import {MdScatterPlot} from "react-icons/md";
import {GiMagnifyingGlass} from "react-icons/gi";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../model/User.ts";
import {Size} from "../../utils/constants.ts";
import Login from "./Login.tsx";
import UserMenu from "./UserMenu.tsx";

const routes = [
    {id: "recordings", icon: <FaDatabase size={Size.icon.XS}/>, link: "/recordings"},
    {id: "identify", icon: <GiMagnifyingGlass size={Size.icon.SM}/>, link: "/identify"},
    {id: "clusters", icon: <MdScatterPlot size={Size.icon.SM}/>, link: "/clusters", protected: true},
];

const Navigation: React.FC = () => {
    const [t] = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const [drawerOpened, setDrawerOpened] = useState(false);

    const filteredRoutes = routes.filter(
        (route) => !route.protected || auth.currentUser?.role === UserRole.ADMIN
    );

    const navMenu = filteredRoutes.map((item, index) => (
        <Button
            key={index}
            size="xs"
            leftSection={item.icon}
            variant={location.pathname.startsWith(item.link) ? "filled" : "subtle"}
            onClick={() => {
                navigate(item.link);
                setDrawerOpened(false);
            }}
        >
            {t(`page.navigation.${item.id}`)}
        </Button>));

    const userMenu = !auth.currentUser?.email
        ? <Login/>
        : <UserMenu/>;

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

            {/* Mobile view */}
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
