import React from 'react';
import {Tune} from "../model/Tune.ts";
import {Pagination} from "../model/Pagination.ts";
import {FilteringOptions} from '../model/FilteringOptions.ts';
import {Filter} from "../model/Filter.ts";

export interface Properties {
    loadData: (filters?: Filter[]) => void;
    exportData: () => void;
    saveData: (data: Tune[]) => void;

    data: Tune[];
    tuneIds: string[];
    setData: (value: Tune[]) => void;
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

    visibleFields: Array<keyof Tune>;
    toggleField: (field: keyof Tune) => void;

    pagination: Pagination;
    setPagination: (value: Pagination) => void;
}

export const DataContext = React.createContext<Properties>({} as Properties);
