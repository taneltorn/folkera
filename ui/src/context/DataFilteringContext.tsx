import React from 'react';
import {Recording} from "../model/Recording.ts";
import {FilteringOptions} from "../utils/filtering.helpers.ts";

export enum SortDirection {
    ASC,
    DESC,
}

export enum View {
    TABLE,
    MAP,
    STATS,
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

    view: View;
    setView: (value: View) => void;
    toggleView: () => void;
}

export const DataFilteringContext = React.createContext<Properties>({} as Properties);
