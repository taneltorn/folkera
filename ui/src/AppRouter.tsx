import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./views/Home.tsx";
import Parishes from "./views/Parishes.tsx";
import RecordingList from "./views/recording/RecordingList.tsx";
import TempStats from "./views/TempStats.tsx";
import NataliMap from "./views/natali/NataliMap.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/recordings",
                element: <RecordingList/>,
            },
            {
                path: "/map",
                element: <Parishes/>,
            },
            {
                path: "/tempstats",
                element: <TempStats/>,
            },
            {
                path: "/natali",
                element: <NataliMap/>,
            }
        ]
    }
]);

const AppRouter = () => {

    return (<>
            <React.Suspense fallback={<p>Loading</p>}>
                <RouterProvider router={router}/>
            </React.Suspense>
        </>
    );
};

export default AppRouter;
