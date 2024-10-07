import {useState} from 'react';
import axios from "axios";
import {Recording} from "../model/Recording.ts";

const API_URL = import.meta.env.VITE_API_URL;

export interface StatsOptions {
    key: string;
    transformer?: string;
}

export const useStatsService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchStats = async (data: Recording[], options: StatsOptions): Promise<Map<string, number>> => {
        setIsLoading(true);
        return axios.post(`${API_URL}/api/stats`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: options
        })
            .then(response => {
                setIsLoading(false);
                return response.data;
            })
            .catch(error => {
                setIsLoading(false);
                throw error;
            });
    }


    return {
        isLoading,
        cancelSource,
        fetchStats,
    };
}