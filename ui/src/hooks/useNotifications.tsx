import {useState} from "react";
import axios from 'axios';
import {useTranslation} from "react-i18next";
import {useToasts} from "./useToasts.tsx";
import {ToastType} from "../context/ToastContext.tsx";
import {Notification} from "../model/Notification.ts";

const API_URL = import.meta.env.VITE_API_URL;

const useNotifications = () => {

    const {t} = useTranslation();
    const {notify} = useToasts();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchNotification = async (id: string): Promise<Notification> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/notifications/${id}`, {
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
                notify(t("toast.error.fetchNotification"), ToastType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const fetchNotifications = async (): Promise<Notification[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/notifications`, {
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
                notify(t("toast.error.fetchNotifications"),  ToastType.ERROR,error);

                setIsLoading(false);
                throw error;
            });
    }

    const fetchActiveNotifications = async (): Promise<Notification[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/notifications/active`, {
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
                notify(t("toast.error.fetchNotifications"), ToastType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const createNotification = async (notification: Notification): Promise<Notification> => {
        setIsLoading(true);
        return axios.post(`${API_URL}/notifications`, notification, {
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
                notify(t("toast.error.createNotification"), ToastType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const updateNotification = async (id: number, notification: Notification): Promise<Notification> => {
        setIsLoading(true);
        return axios.put(`${API_URL}/notifications/${id}`, notification, {
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
                notify(t("toast.error.saveNotification"), ToastType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    const removeNotification = async (id: number): Promise<number> => {
        setIsLoading(true);
        return axios.delete(`${API_URL}/notifications/${id}`, {
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
                notify(t("toast.error.deleteNotification"), ToastType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    return {
        isLoading,
        fetchNotification,
        fetchNotifications,
        fetchActiveNotifications,
        createNotification,
        updateNotification,
        removeNotification,
        cancelSource
    }
};

export default useNotifications;
