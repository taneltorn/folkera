import React from 'react';
import {Recording} from "../../../domain/Recording.ts";
import {Pagination} from "../../../domain/Pagination.ts";
import {FilteringOptions} from "../../../domain/FilteringOptions.ts";

export interface Filter {
    field: string;
    value: string;
}

export interface Properties {
    loadData: () => void;
    exportData: () => void;
    saveData: (data: Recording[]) => void;
    
    data: Recording[];
    setData: (value: Recording[]) => void;
    isLoading: boolean;

    totalItems: number;
    totalPages: number;

    filteringOptions: FilteringOptions;

    filters: Filter[];
    addFilter: (type: string, values: string[]) => void;
    removeFilter: (type: string, value?: string) => void;
    clearFilters: () => void;

    hiddenFields: Array<keyof Recording>;
    toggleField: (field: keyof Recording) => void;

    pagination: Pagination;
    setPagination: (value: Pagination) => void;
}

export const DataContext = React.createContext<Properties>({} as Properties);
