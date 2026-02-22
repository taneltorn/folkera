import React from "react";
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./views/Home.tsx";
import TuneList from "./views/tunes/TuneList.tsx";
import Admin from "./views/admin/Admin.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {UserRole} from "./model/User.ts";
import MyProfileView from "./views/profile/MyProfileView.tsx";
import TuneDetails from "./views/tunes/TuneDetails.tsx";
import IdentifyView from "./views/identify/IdentifyView.tsx";
import ExampleMap from "./views/tunes/map/components/ExampleMap.tsx";
import ClusterPlotView from "./views/admin/cluster/ClusterPlotView.tsx";
import {SimilarTunesContextProvider} from "./hooks/useSimilarTunes.tsx";
import ChangeLog from "./ChangeLog.tsx";

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
                path: "/changelog",
                element: <ChangeLog/>,
            },
            {
                path: "/tunes",
                element: <TuneList/>,
            },
            {
                path: "/tunes/:id",
                element: <SimilarTunesContextProvider>
                    <TuneDetails/>
                </SimilarTunesContextProvider>,
            },
            {
                path: "/identify",
                element: <SimilarTunesContextProvider>
                    <IdentifyView/>
                </SimilarTunesContextProvider>,
            },
            {
                path: "/clusters",
                element:
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                        <ClusterPlotView/>
                    </ProtectedRoute>,
            },
            {
                path: "/profile",
                element:
                    <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
                        <MyProfileView/>
                    </ProtectedRoute>,
            },
            {
                path: "/admin",
                element:
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                        <Admin/>
                    </ProtectedRoute>,
            },
            {
                path: "/map",
                element: <ExampleMap/>,
            },
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
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
