import {useState} from 'react';
import axios from "axios";
import {urlify} from "../utils/helpers.tsx";
import {NotificationType} from "../context/NotificationContext.tsx";
import {useNotifications} from "../hooks/useNotifications.tsx";
import {useTranslation} from "react-i18next";
import {GroupBy} from "../model/GroupBy.ts";
import {Filter} from "../model/Filter.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const useStatsService = () => {

    const {t} = useTranslation();
    const {notify} = useNotifications();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchStats = async (filters: Filter[], groupBy: GroupBy): Promise<{ [key: string]: number }[]> => {
        setIsLoading(true);

        return axios.get(`${API_URL}/stats`, {
            params: {
                groupBy: groupBy,
                ...urlify(filters)
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

                notify(t("toast.error.fetchStats"), NotificationType.ERROR, error);

                throw error;
            });
    }
    
    return {
        isLoading,
        cancelSource,
        fetchStats,
    };
}