import React from 'react';
import {Filter} from "../model/Filter.ts";

export interface Properties {
    visible: boolean;
    setVisible: (value: boolean) => void;
    filters: Filter[];
    setFilters: (filters: Filter[]) => void;
    updateFilter: (field: string, filter: Filter) => void;
    clearFilter: (field: string | string[]) => void;
}

export const AdvancedFilteringContext = React.createContext<Properties>({} as Properties);
