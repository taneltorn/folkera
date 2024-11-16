import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.scss'
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {MantineProvider, createTheme} from '@mantine/core';
import {AudioContextProvider} from "./hooks/useAudioContext.tsx";
import AppRouter from "./AppRouter.tsx";
import "./i18n";
import 'leaflet/dist/leaflet.css';
import 'react-h5-audio-player/lib/styles.css';
import {NotificationContextProvider} from "./hooks/useNotifications.tsx";
import {ActiveViewContextProvider} from "./hooks/useActiveView.tsx";
import {StatsOptionsContextProvider} from "./hooks/useStatsOptions.tsx";
import {MapOptionsContextProvider} from "./hooks/useMapOptions.tsx";
import {ModificationsContextProvider} from "./hooks/useModifications.tsx";

const theme = createTheme({
    fontFamily: 'Verdana, Montserrat, sans-serif',
    defaultRadius: 'xl',
    primaryColor: 'red',
    primaryShade: 9,
    colors: {
        'red': ['#970000', '#970000', '#970000', '#970000', '#E70000', '#D70000', '#C70000', '#B70000', '#A70000', '#970000'],
    },
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <MantineProvider theme={theme}>
        <NotificationContextProvider>
            <AudioContextProvider>
                <ActiveViewContextProvider>
                    <ModificationsContextProvider>
                    <StatsOptionsContextProvider>
                        <MapOptionsContextProvider>
                            <AppRouter/>
                        </MapOptionsContextProvider>
                    </StatsOptionsContextProvider>
                    </ModificationsContextProvider>
                </ActiveViewContextProvider>
            </AudioContextProvider>
        </NotificationContextProvider>
    </MantineProvider>
    // </React.StrictMode>,
)
