import React from 'react';
import {FilteringOptions} from "../utils/filtering.helpers.ts";
import {Recording} from "../../../domain/Recording.ts";

export enum SortDirection {
    ASC,
    DESC,
}

export interface Filter {
    field: string;
    value: string;
}

export interface Sort {
    field: keyof Recording;
    direction: SortDirection;
}

export interface Properties {

    filters: Filter[];
    addFilter: (type: string, values: string[]) => void;
    removeFilter: (type: string, value?: string) => void;
    clearFilters: () => void;

    hiddenFields: Array<keyof Recording>;
    toggleField: (field: keyof Recording) => void;

    sort: Sort | undefined;
    setSort: (value: Sort | undefined) => void;

    activePage: number;
    setActivePage: (value: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;

    filteredData: Recording[];
    filteringOptions: FilteringOptions;
}

export const DataFilteringContext = React.createContext<Properties>({} as Properties);
