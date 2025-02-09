import {useState} from 'react';
import {Recording} from '../../../domain/Recording';
import axios from "axios";
import Papa from "papaparse";
import {Filter} from "../context/DataFilteringContext.tsx";
import {useTranslation} from 'react-i18next';
import {useNotifications} from "./useNotifications.tsx";

const API_URL = import.meta.env.VITE_API_URL;

export const useDataService = () => {

    const {t} = useTranslation();
    const {notify} = useNotifications();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const cancelSource = axios.CancelToken.source();

    const fetchData = async (): Promise<Recording[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/api/recordings`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                notify(t("toast.error.fetchData"), error);

                setIsLoading(false);
                throw error;
            });

    }

    const saveData = async (data: Recording[]): Promise<Recording[]> => {
        setIsLoading(true);
        return axios.put(`${API_URL}/api/recordings`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.data)
            .finally(() => setIsLoading(false));
    }

    const exportData = async (data: Recording[], filters: Filter[]) => {
        try {
            const filename = !!filters.length
                ? "pillilood_" + filters.map(f => f.value).join("_").replace(".", "").replace(" / ", "_") + ".csv"
                : "pillilood.csv";

            setIsLoading(false);

            const headerTranslations: Record<keyof Recording, string> = {
                ref: t("recording.ref"),
                content: t("recording.content"),
                tune: t("recording.tune"),
                year: t("recording.year"),
                instrument: t("recording.instrument"),
                dance: t("recording.dance"),
                datatype: t("recording.datatype"),
                performer: t("recording.performer"),
                parish: t("recording.parish"),
                origin: t("recording.origin"),
                collector: t("recording.collector"),
                notes: t("recording.notes"),
                comments: t("recording.comments"),
                archive: t("recording.archive"),
                file: t("recording.file"),
                order: t("recording.order"),
                kivike: t("recording.kivike"),
                duration: t("recording.duration"),
                quality: t("recording.quality"),
            };

            const transformedData = data.map(record => {
                const transformedRecord: Record<string, any> = {};
                Object.keys(record).forEach((key) => {
                    const typedKey = key as keyof Recording;
                    transformedRecord[headerTranslations[typedKey] || typedKey] = record[typedKey];
                });
                return transformedRecord;
            });
            const csvData = Papa.unparse(transformedData);

            const blob = new Blob([csvData]);
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return data;
        } catch (e) {
            throw new Error("Export failed");
        }
    };


    return {
        isLoading,
        cancelSource,
        fetchData,
        saveData,
        exportData,
    };
}