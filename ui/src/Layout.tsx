import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell, Divider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import {useAudioPlayer} from "./hooks/useAudioContext.tsx";
import {ActiveViewContextProvider} from "./hooks/useActiveView.tsx";

const Layout: React.FC = () => {

    const {track} = useAudioPlayer();

    return (
        <ActiveViewContextProvider>
        
        <AppShell
            py={"md"}
            layout={"default"}
            // header={{height: 60}}
        >
            <Notifications position="top-right"/>

            {/*<AppShell.Header>*/}
            {/*<Header/>*/}
            {/*</AppShell.Header>*/}

            <AppShell.Main>
                <Header/>
                <Divider mb={"md"}/>

                <Outlet/>
            </AppShell.Main>

            {track &&
                <AppShell.Footer>
                    <Footer/>
                </AppShell.Footer>}
        </AppShell>
        </ActiveViewContextProvider>
    );
}

export default Layout;
