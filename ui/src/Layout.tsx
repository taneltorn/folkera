import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import {useAudioPlayer} from "./hooks/useAudioContext.tsx";

const Layout: React.FC = () => {

    const {track} = useAudioPlayer();

    return (
        <AppShell
            py={"md"}
            layout={"default"}
            header={{height: 60}}
        >
            <Notifications position="top-right"/>

            <AppShell.Header>
                <Header/>
            </AppShell.Header>

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>

            {track &&
                <AppShell.Footer>
                    <Footer/>
                </AppShell.Footer>}
        </AppShell>
    );
}

export default Layout;
