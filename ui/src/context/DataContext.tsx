import React from 'react';
import {Recording} from "../model/Recording.ts";
import {Pagination} from "../model/Pagination.ts";
import {FilteringOptions} from '../model/FilteringOptions.ts';
import {Filter} from "../model/Filter.ts";

export interface Properties {
    loadData: (filters?: Filter[]) => void;
    exportData: () => void;
    saveData: (data: Recording[]) => void;

    data: Recording[];
    setData: (value: Recording[]) => void;
    isLoading: boolean;

    totalItems: number;
    totalPages: number;

    filteringOptions: FilteringOptions;

    filters: Filter[];
    setFilters: (values: Filter[]) => void;
    addFilter: (filter: Filter, replace?: boolean) => void;
    useFilter: (filter: Filter) => void;
    removeFilter: (filter: Filter) => void;

    clearFilters: () => void;

    hiddenFields: Array<keyof Recording>;
    toggleField: (field: keyof Recording) => void;

    pagination: Pagination;
    setPagination: (value: Pagination) => void;
}

export const DataContext = React.createContext<Properties>({} as Properties);
