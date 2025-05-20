import {useState} from 'react';
import axios from "axios";
import {NotificationType} from "../context/NotificationContext.tsx";
import {useNotifications} from "../hooks/useNotifications.tsx";
import {useTranslation} from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

export const useIdentifyService = () => {

    const {t} = useTranslation();
    const {notify} = useNotifications();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const identify = async (file: string, top: number = 10, skipFirstResult: boolean = false): Promise<any> => {
        setIsLoading(true);

        return axios.get(`${API_URL}/identify`, {
            params: {
                file: file,
                top: top,
                skipFirstResult: skipFirstResult
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                setIsLoading(false);

                notify(t("toast.error.test"), NotificationType.ERROR, error);

                throw error;
            });
    }

    const upload = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);

        setIsLoading(true);

        return axios
            .post(`${API_URL}/identify/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setIsLoading(false);
                return response.data.filePath; // this is the value you'll pass to `identify`
            })
            .catch((error) => {
                setIsLoading(false);
                notify(t("toast.error.test"), NotificationType.ERROR, error);
                throw error;
            });
    };

    const deleteFile = async (filePath: string): Promise<void> => {
        try {
            await axios.delete(`${API_URL}/identify/delete`, {
                data: {filePath},
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            notify(t("toast.error.test"), NotificationType.ERROR, error);
            throw error;
        }
    };


    return {
        isLoading,
        cancelSource,
        identify,
        upload,
        deleteFile
    };
}