import {useState} from 'react';
import {Recording} from '../../../domain/Recording.ts';
import axios from "axios";
import {Filter} from "../context/DataContext.tsx";
import {Pagination} from "../../../domain/Pagination.ts";
import {urlify} from "../utils/helpers.tsx";
import {ApiResponse} from "../../../domain/ApiResponse.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const useDataService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchData = async (filters?: Filter[], pagination?: Pagination): Promise<ApiResponse<Recording>> => {
        setIsLoading(true);

        return axios.get(`${API_URL}/api/recordings`, {
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

    const saveData = async (data: Recording[]): Promise<Recording[]> => {
        setIsLoading(true);
        return axios.put(`${API_URL}/api/recordings`, data, {
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
        fetchData,
        saveData,
    };
}