import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell, Divider, Portal, useMantineTheme} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "./components/header/Header.tsx";
import BottomAudioPlayer from "./components/footer/BottomAudioPlayer.tsx";
import {useAudioPlayer} from "./hooks/useAudioContext.tsx";
import {ActiveViewContextProvider} from "./hooks/useActiveView.tsx";
import ActiveNotificationsPanel from "./ActiveNotificationsPanel.tsx";

const Layout: React.FC = () => {

    const {track} = useAudioPlayer();
    const theme = useMantineTheme();

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

                <Portal>
                    <AppShell.Footer
                        zIndex={10000} bg={"gray.1"}
                        style={{borderTop: `1px solid ${theme.colors.gray[2]}`}}
                    >
                        {track && <BottomAudioPlayer/>}
                    </AppShell.Footer>
                </Portal>
            </AppShell>
        </ActiveViewContextProvider>
    );
}

export default Layout;
