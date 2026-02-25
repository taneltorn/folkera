import React from 'react';
import {Filter} from "../model/Filter.ts";
import {DynamicFilteringRow} from "../model/DynamicFilteringRow.ts";

export interface Properties {
    visible: boolean;
    setVisible: (value: boolean) => void;
    filters: Filter[];
    setFilters: (filters: Filter[]) => void;
    updateFilter: (key: string, filter: Filter) => void;
    clearFilter: (key: string | string[]) => void;
    dynamicRows: DynamicFilteringRow[];
    setDynamicRows: (values: DynamicFilteringRow[]) => void;
}

export const AdvancedFilteringContext = React.createContext<Properties>({} as Properties);
