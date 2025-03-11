import {useState} from "react";
import axios from 'axios';
import {NotificationType} from "../context/NotificationContext.tsx";
import {useTranslation} from "react-i18next";
import {useNotifications} from "../hooks/useNotifications.tsx";
import {User} from "../model/User.ts";

const API_URL = import.meta.env.VITE_API_URL;

const useUserService = () => {

    const {t} = useTranslation();
    const {notify} = useNotifications();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchUserByEmail = async (email: string): Promise<User> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/users/${email}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.fetchUser"), NotificationType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const fetchUsers = async (): Promise<User[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.fetchUsers"), NotificationType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const createUser = async (user: User): Promise<User> => {
        setIsLoading(true);
        return axios.post(`${API_URL}/users`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                notify(t("toast.success.createUser"), NotificationType.SUCCESS);
                
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.createUser"), NotificationType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const modifyUser = async (id: number, user: User): Promise<User> => {
        setIsLoading(true);
        return axios.patch(`${API_URL}/users/${id}`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                notify(t("toast.success.modifyUser"), NotificationType.SUCCESS);
                
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.modifyUser"), NotificationType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }


    const updateUserPassword = async (id: number, user: User): Promise<User> => {
        setIsLoading(true);
        return axios.patch(`${API_URL}/users/${id}/password`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                notify(t("toast.success.modifyUser"), NotificationType.SUCCESS);
                
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.modifyUser"), NotificationType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const removeUser = async (id: number): Promise<User> => {
        setIsLoading(true);
        return axios.delete(`${API_URL}/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                notify(t("toast.success.removeUser"), NotificationType.SUCCESS);
                
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.removeUser"), NotificationType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    return {
        isLoading,
        fetchUserByUserName: fetchUserByEmail,
        fetchUsers,
        createUser,
        updateUser: modifyUser,
        updateUserPassword,
        removeUser,
        cancelSource
    }
};

export default useUserService;
