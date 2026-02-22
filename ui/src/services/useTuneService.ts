import {useState} from 'react';
import {Tune} from '../model/Tune.ts';
import axios from "axios";
import {Pagination} from "../model/Pagination.ts";
import {urlify} from "../utils/helpers.tsx";
import {ApiResponse} from "../model/ApiResponse.ts";
import {Filter} from "../model/Filter.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const useTuneService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchTune = async (id: string): Promise<Tune> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/tunes/${id}`, {
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

    const fetchTunes = async (filters?: Filter[], pagination?: Pagination): Promise<ApiResponse<Tune>> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/tunes`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...pagination,
                ...urlify(filters)
            }
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

    const fetchTunesByIds = async (ids: string[]): Promise<Tune[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/tunes/by-ids`, {
            params: {
                ids: ids.join(",")
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
                throw error;
            });
    }

    const saveTunes = async (data: Tune[]): Promise<Tune[]> => {
        setIsLoading(true);
        return axios.put(`${API_URL}/tunes`, data, {
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
                setIsLoading(false);
                throw error;
            });
    }

    return {
        isLoading,
        cancelSource,
        fetchTune,
        fetchTunes,
        fetchTunesByIds,
        saveTunes,
    };
}