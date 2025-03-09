import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {AuthContext} from "../context/AuthContext.tsx";
import {UserDetails} from '../model/UserDetails.ts';
import {UserRole} from '../model/User.ts';
import {NotificationType} from "../context/NotificationContext.tsx";
import {useNotifications} from "./useNotifications.tsx";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({children}) => {

    const {t} = useTranslation();
    const {notify} = useNotifications();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserDetails | null>();

    const login = async (email: string, password: string): Promise<any> => {
        return fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.token && data.user) {
                    setCurrentUser({
                        ...data.user,
                        isUser: [UserRole.ADMIN, UserRole.USER].includes(data.user.role),
                        isAdmin: UserRole.ADMIN === data.user.role
                    });
                    return data;
                } else { 
                    throw new Error(t("toast.error.wrongCredentials"));
                }
            })
            .catch(e => {
                notify(t("toast.error.login"), NotificationType.ERROR, e);
                setCurrentUser(null);
            });
    }

    const logout = async (): Promise<any> => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
            setCurrentUser(null);
        } catch (e) {
            setCurrentUser(null);
        }
    }

    const verify = async () => {
        fetch(`${API_URL}/auth/verify`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((data) => {
                if (data.user) {
                    setCurrentUser({
                        ...data.user,
                        isUser: [UserRole.ADMIN, UserRole.USER].includes(data.user.role),
                        isAdmin: UserRole.ADMIN === data.user.role
                    });
                    return;
                } else {
                    setCurrentUser(null);
                }
            })
            .catch(e => {
                notify(t("toast.error.verifyToken"), NotificationType.ERROR, e);
                setCurrentUser(null);
            });
    }

    useEffect(() => {
        verify().then(() => setIsInitialized(true));
    }, []);

    const context = useMemo(() => ({
        currentUser,
        login,
        logout,
        verify,
    }), [currentUser, isInitialized]);

    return (
        <>
            {isInitialized && currentUser !== undefined &&
                <AuthContext.Provider value={context}>
                    {children}
                </AuthContext.Provider>}
        </>
    )
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};
