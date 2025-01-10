import {useState} from 'react';
import axios from "axios";
import {MapStats, StatsItem, StatsOptions} from "../model/Stats.ts";
import {Recording} from "../../../domain/Recording.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const useStatsService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchStats = async (data: Recording[] | any, options: StatsOptions): Promise<StatsItem[]> => {
        setIsLoading(true);

        return axios.post(`${API_URL}/api/stats`,
            {
                groupBy: options.groupBy,
                transformers: options.transformers,
                groups: options.groups,
                sort: options.sort,
                data: data,
            },
            {
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
                throw error;
            });
    }

    const fetchMapStats = async (data: Recording[]): Promise<MapStats> => {
        setIsLoading(true);

        return axios.post(`${API_URL}/api/stats/map`, data,
            {
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
                throw error;
            });
    }

    return {
        isLoading,
        cancelSource,
        fetchStats,
        fetchMapStats,
    };
}