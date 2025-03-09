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
                path: "/clusters",
                element: <ClusterPlotView/>,
            },
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]}><Admin/></ProtectedRoute>,
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
