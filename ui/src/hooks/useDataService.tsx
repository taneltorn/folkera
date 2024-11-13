import {useState} from 'react';
import {Recording} from '../../../domain/Recording';
import axios from "axios";
import Papa from "papaparse";

const API_URL = import.meta.env.VITE_API_URL;

export const useDataService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchData = async (): Promise<Recording[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/api/recordings`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(r => r.data)
            .finally(() => setIsLoading(false));
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

    const exportData = () => {
        fetchData()
            .then(data => {
                setIsLoading(false);
                const csvData = Papa.unparse(data);

                const blob = new Blob([csvData], {groupBy: 'text/csv;charset=utf-8;'});
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', "export.csv");
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                return data;
            })
            .catch(error => {
                setIsLoading(false);
                throw error;
            });
    };


    return {
        isLoading,
        cancelSource,
        fetchData,
        saveData,
        exportData,
    };
}