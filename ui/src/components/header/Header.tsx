import React from 'react';
import {Link} from "react-router-dom";
import Navigation from "./Navigation.tsx";
import Logo from "./Logo.tsx";
import {Box, Group} from "@mantine/core";

const Header: React.FC = () => {

    return (
        <Box px={"md"} py={"xs"}>
            <Group>
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <Navigation/>
            </Group>
        </Box>
    );
}

export default Header;
