import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Group} from "@mantine/core";
import {Size} from "../../utils/common.constants.ts";
import {FaDatabase} from "react-icons/fa";
import {MdScatterPlot} from "react-icons/md";

const routes = [
    {id: 'archive', icon: <FaDatabase size={Size.icon.XS}/>, link: "/recordings"},
    {id: 'clusters', icon: <MdScatterPlot size={Size.icon.XS}/>, link: "/clusters"},
];

const Navigation: React.FC = () => {

    const [t] = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Group gap={4}>
            {routes.map((item, index) => (
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
