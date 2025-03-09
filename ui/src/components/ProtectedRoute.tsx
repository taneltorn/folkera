import React, {ReactNode, useEffect} from "react";
import {Navigate} from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.tsx";
import {UserRole} from "../model/User.ts";

interface Properties {
    children: ReactNode;
    allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<Properties> = ({children, allowedRoles}) => {

    const auth = useAuth();

    if (!allowedRoles.includes(auth.currentUser?.role as UserRole)) {
        return <Navigate to="/" replace/>;
    }

    useEffect(() => {
        auth.verify();
    }, []);

    return children;
};

export default ProtectedRoute;