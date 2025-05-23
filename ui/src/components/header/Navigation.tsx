import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Group} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {FaDatabase} from "react-icons/fa";
import {MdScatterPlot} from "react-icons/md";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../model/User.ts";
import {GiMagnifyingGlass} from "react-icons/gi";
// import {IoDocumentOutline} from "react-icons/io5";

const routes = [
    {id: 'recordings', icon: <FaDatabase size={Size.icon.XS}/>, link: "/recordings"},
    {id: 'clusters', icon: <MdScatterPlot size={Size.icon.SM}/>, link: "/clusters", protected: true},
    {id: 'identify', icon: <GiMagnifyingGlass size={Size.icon.SM}/>, link: "/identify"},
    // {id: 'uurimused', icon: <IoDocumentOutline size={Size.icon.XS}/>, link: "/uurimused"},
];

const Navigation: React.FC = () => {

    const [t] = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <Group gap={4}>
            {routes
                .filter(route => !route.protected || auth.currentUser?.role === UserRole.ADMIN)
                .map((item, index) => (
                    <Button
                        key={index}
                        size={"xs"}
                        leftSection={item.icon}
                        variant={location.pathname.startsWith(item.link) ? "filled" : "subtle"}
                        onClick={() => navigate(item.link)}
                    >
                        {t(`page.navigation.${item.id}`)}
                    </Button>
                ))}
        </Group>
    );
}

export default Navigation;
