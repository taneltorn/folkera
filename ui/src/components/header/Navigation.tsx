import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Group, Text} from "@mantine/core";
import {Size} from "../../utils/common.constants.ts";
// import {CiMap} from "react-icons/ci";
import {FaDatabase} from "react-icons/fa";
import {IoIosStats} from "react-icons/io";
import {BsClipboardDataFill} from "react-icons/bs";

const routes = [
    {id: 'archive', icon: <FaDatabase size={Size.icon.XS}/>, link: "/recordings"},
    // {id: 'map', icon: <CiMap size={Size.icon.SM}/>, link: "/map"},
    {id: 'tempstats', icon: <BsClipboardDataFill size={Size.icon.SM}/>, link: "/tempstats"},
];


const Navigation: React.FC = () => {

    const [t] = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(url);
    }

    return (
        <Group gap={4}>
            {routes.map((item, index) => (
                <Button
                    key={index}
                    size={"xs"}
                    leftSection={item.icon}
                    variant={item.link === "/" && location.pathname === "/" || item.link !== "/" && location.pathname.startsWith(item.link) ? "filled" : "subtle"}
                    onClick={() => handleNavigate(item.link)}
                >
                    <Text fw={100} size={"xs"}>
                        {t(`page.sidebar.navigation.${item.id}`)}
                    </Text>
                </Button>
            ))}
        </Group>
    );
}

export default Navigation;
