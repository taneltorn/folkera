import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell, Divider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "./components/header/Header.tsx";
import BottomAudioPlayer from "./components/footer/BottomAudioPlayer.tsx";
import {useAudioPlayer} from "./hooks/useAudioContext.tsx";
import {ActiveViewContextProvider} from "./hooks/useActiveView.tsx";

const Layout: React.FC = () => {

    const {track} = useAudioPlayer();

    return (
        <ActiveViewContextProvider>
            <AppShell
                // py={"md"}
                layout={"default"}
                
            >
                <Notifications position="top-right"/>

                <AppShell.Main>
                    <Header/>
                    <Divider mb={"md"}/>

                    <Outlet/>
                </AppShell.Main>

                <AppShell.Footer>
                    {track && <BottomAudioPlayer/>}
                </AppShell.Footer>
            </AppShell>
        </ActiveViewContextProvider>
    );
}

export default Layout;
