import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import './index.scss'
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {MantineProvider, createTheme} from '@mantine/core';
import AppRouter from "./AppRouter.tsx";
import "./i18n";
import 'leaflet/dist/leaflet.css';
import 'react-h5-audio-player/lib/styles.css';
import chroma from "chroma-js";
import ContextProviders from "./ContextsProviders.tsx";

const colors = {
    red: chroma.scale("Reds").colors(10),
    blue: chroma.scale("Blues").colors(10),
    green: chroma.scale("PuBuGn").colors(10),
    orange: chroma.scale("YlOrBr").colors(10),
    pink: chroma.scale("PuRd").colors(10),
    purple: chroma.scale("Purples").colors(10),
    violet: chroma.scale("YlGnBu").colors(10),
    gray: chroma.scale("Greys").colors(10),
}

const theme = createTheme({
    fontFamily: 'Verdana, Montserrat, sans-serif',
    defaultRadius: 'xl',
    primaryColor: 'red',
    primaryShade: 9,
    // @ts-ignore
    colors: colors,
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
        <ContextProviders>
            <AppRouter/>
        </ContextProviders>
    </MantineProvider>
    // </React.StrictMode>,
)
