import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./views/Home.tsx"; 
import RecordingsList from "./views/recordings/RecordingsList.tsx";
import ClusterPlotView from "./views/clustermap/ClusterPlotView.tsx";
import Admin from "./views/admin/Admin.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {UserRole} from "./model/User.ts";
import MyProfileView from "./views/profile/MyProfileView.tsx";
import RecordingsDetails from "./views/recordings/RecordingsDetails.tsx";
import IdentifyView from "./views/identify/IdentifyView.tsx";
import ExampleMap from "./views/recordings/map/components/ExampleMap.tsx";

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
                element: <RecordingsList/>,
            },
            {
                path: "/recordings/:id",
                element: <RecordingsDetails/>,
            },
            {
                path: "/identify",
                element: <IdentifyView/>,
            },
            {
                path: "/clusters",
                element: <ClusterPlotView/>,
            },
            {
                path: "/profile",
                element: <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]}><MyProfileView/></ProtectedRoute>,
            },
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]}><Admin/></ProtectedRoute>,
            },
            {
                path: "/map",
                element: <ExampleMap/>,
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
