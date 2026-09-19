import {useState} from "react";
import axios from 'axios';
import {ToastType} from "../context/ToastContext.tsx";
import {useTranslation} from "react-i18next";
import {useToasts} from "./useToasts.tsx";
import {TuneAccess} from "../model/TuneAccess.ts";

const API_URL = import.meta.env.VITE_API_URL;

const useAccessService = () => {

    const {t} = useTranslation();
    const {notify} = useToasts();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const assignAccess = async (data: TuneAccess[]): Promise<TuneAccess[]> => {
        setIsLoading(true);
        return axios.post(`${API_URL}/access`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                notify(t("toast.success.assignAccess"), ToastType.SUCCESS);

                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.assignAccess"), ToastType.ERROR, error);

                setIsLoading(false);
                throw error;
            });
    }

    return {
        isLoading,
        cancelSource,

        assignAccess,
    }
};

export default useAccessService;
