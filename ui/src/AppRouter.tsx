import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./views/Home.tsx"; 
import RecordingList from "./views/recording/RecordingList.tsx";
import NataliMap from "./views/natali/NataliMap.tsx";
import ClusterPlot from "./components/ClusterPlot.tsx";
import Stats from "./views/stats/Stats.tsx";

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
                path: "/clusters",
                element: <ClusterPlot/>,
            },
            {
                path: "/stats",
                element: <Stats/>,
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
