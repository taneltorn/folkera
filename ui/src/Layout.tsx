import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell, Divider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "./components/header/Header.tsx";
import BottomAudioPlayer from "./components/footer/BottomAudioPlayer.tsx";
import {useAudioPlayer} from "./hooks/useAudioContext.tsx";
import {ActiveViewContextProvider} from "./hooks/useActiveView.tsx";
import ActiveNotificationsPanel from "./ActiveNotificationsPanel.tsx";

const Layout: React.FC = () => {

    const {track} = useAudioPlayer();

    return (
        <ActiveViewContextProvider>
            <AppShell layout={"default"}>
                <Notifications position="top-right"/>
                <AppShell.Main>
                    <ActiveNotificationsPanel/>
                    <Header/>
                    <Divider mb={"md"}/>

                    <Outlet/>
                </AppShell.Main>

                <AppShell.Footer bg={"gray.1"} withBorder={true}>
                    {track && <BottomAudioPlayer/>}
                </AppShell.Footer>
            </AppShell>
        </ActiveViewContextProvider>
    );
}

export default Layout;
