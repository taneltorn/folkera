import {useState} from 'react';
import axios from "axios";
import {Filter} from "../context/DataContext.tsx";
import {urlify} from "../utils/helpers.tsx";
import { FilteringOptions } from '../model/FilteringOptions.ts';

const API_URL = import.meta.env.VITE_API_URL;

export const useOptionsService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cancelSource = axios.CancelToken.source();

    const fetchOptions = async (filters?: Filter[]): Promise<FilteringOptions> => {
        setIsLoading(true);

        return axios.get(`${API_URL}/options`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
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

    return {
        isLoading,
        cancelSource,
        fetchOptions,
    };
}