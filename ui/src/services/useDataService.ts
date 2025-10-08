import {useState} from 'react';
import {Recording} from '../model/Recording.ts';
import axios from "axios";
import {Pagination} from "../model/Pagination.ts";
import {urlify} from "../utils/helpers.tsx";
import {ApiResponse} from "../model/ApiResponse.ts";
import {Filter} from "../model/Filter.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const useDataService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchRecording = async (id: string): Promise<Recording> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/recordings/${id}`, {
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

    const fetchRecordings = async (filters?: Filter[], pagination?: Pagination): Promise<ApiResponse<Recording>> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/recordings`, {
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

    const fetchRecordingsByIds = async (ids: string[]): Promise<Recording[]> => {
        setIsLoading(true);
        return axios.get(`${API_URL}/recordings/by-ids`, {
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

    const saveData = async (data: Recording[]): Promise<Recording[]> => {
        setIsLoading(true);
        return axios.put(`${API_URL}/recordings`, data, {
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
        fetchRecording,
        fetchRecordings,
        fetchRecordingsByIds,
        saveData,
    };
}