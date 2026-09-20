import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {UserRole} from "../model/User.ts";

interface Properties {
    children: ReactNode;
    allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<Properties> = ({children, allowedRoles}) => {

    const {currentUser} = useAuth();

    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/" replace/>;
    }

    return children;
};

export default ProtectedRoute;