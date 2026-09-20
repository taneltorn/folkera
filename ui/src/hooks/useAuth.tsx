import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {AuthContext} from "../context/AuthContext.tsx";
import {UserDetails} from '../model/User.ts';
import {ToastType} from "../context/ToastContext.tsx";
import {useToasts} from "./useToasts.tsx";
import {toUserDetails} from "../utils/helpers.tsx";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({children}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserDetails | null>(null);

    const login = async (usernameOrEmail: string, password: string): Promise<any> => {
        return fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "usernameOrEmail": usernameOrEmail,
                "password": password
            }),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.token && data.user) {
                    setCurrentUser(toUserDetails(data.user));
                    return data;
                } else {
                    throw new Error(t("toast.error.wrongCredentials"));
                }
            })
            .catch(e => {
                notify(t("toast.error.login"), ToastType.ERROR, e);
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
        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data.user) {
                setCurrentUser(toUserDetails(data.user));
            } else {
                setCurrentUser(null);
            }
        } catch (e) {
            notify(t("toast.error.verifyToken"), ToastType.ERROR, e);
            setCurrentUser(null);
        }
    };

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
