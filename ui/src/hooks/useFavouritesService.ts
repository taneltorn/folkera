import {useState} from "react";
import axios from "axios";
import {ToastType} from "../context/ToastContext.tsx";
import {useTranslation} from "react-i18next";
import {useToasts} from "./useToasts.tsx";
import {useAuth} from "./useAuth.tsx";

const API_URL = import.meta.env.VITE_API_URL;

const useFavouritesService = () => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {verify} = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const addFavourite = async (tuneId: string): Promise<void> => {
        setIsLoading(true);

        return axios.post(
            `${API_URL}/favourites/${encodeURIComponent(tuneId)}`,
            {},
            {
                withCredentials: true
            }
        )
            .then(async () => {
                await verify();
                setIsLoading(false);
            })
            .catch(error => {
                notify(
                    t("toast.error.addFavourite"),
                    ToastType.ERROR,
                    error
                );

                setIsLoading(false);
                throw error;
            });
    };

    const removeFavourite = async (tuneId: string): Promise<void> => {
        setIsLoading(true);

        return axios.delete(
            `${API_URL}/favourites/${encodeURIComponent(tuneId)}`,
            {
                withCredentials: true
            }
        )
            .then(async () => {
                await verify();
                setIsLoading(false);
            })
            .catch(error => {
                notify(
                    t("toast.error.removeFavourite"),
                    ToastType.ERROR,
                    error
                );

                setIsLoading(false);
                throw error;
            });
    };

    return {
        isLoading,
        cancelSource,

        addFavourite,
        removeFavourite
    };
};

export default useFavouritesService;