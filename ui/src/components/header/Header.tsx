import React from 'react';
import {Link} from "react-router-dom";
import Navigation from "./Navigation.tsx";
import Logo from "./Logo.tsx";
import {Group} from "@mantine/core";
import {useAuth} from "../../hooks/useAuth.tsx";
import Login from "./Login.tsx";
import Logout from "./Logout.tsx";

const Header: React.FC = () => {

    const auth = useAuth();

    return (
        <Group justify={"space-between"} px={"md"} py={"xs"}>
            <Group>
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <Navigation/>
            </Group>

            <Group>
                {!auth.currentUser?.email ? <Login/> : <Logout/>}
            </Group>
        </Group>
    );
}

export default Header;
