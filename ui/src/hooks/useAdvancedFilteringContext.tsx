import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {AdvancedFilteringContext} from "../context/AdvancedFilteringContext.tsx";
import {Filter} from "../model/Filter.ts";
import {useDataContext} from "./useDataContext.tsx";
import {DynamicFilteringRow} from "../model/DynamicFilteringRow.ts";

interface Properties {
    children: React.ReactNode;
}

export const AdvancedFilteringContextProvider: React.FC<Properties> = ({children}) => {

    const dataContext = useDataContext();

    const [visible, setVisible] = useState<boolean>(false);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [dynamicRows, setDynamicRows] = useState<DynamicFilteringRow[]>([]);

    const updateFilter = (filterKey: string, filter: Filter) => {
        if (!filter.value && filter.type === "contains") {
            clearFilter(filterKey);
            return;
        }

        setFilters(prev => {
            const updated = prev.filter(f => f.filterKey !== filterKey);
            updated.push(filter);
            return updated;
        });
    };

    const clearFilter = (filterKey: string | string[]) => {
        const filterList = filters.filter(f => Array.isArray(filterKey)
            ? !filterKey.includes(f.field)
            : f.field !== filterKey);
        setFilters(filterList);
    }

    const context = useMemo(() => ({
        visible, setVisible,
        filters,
        setFilters,
        updateFilter,
        clearFilter,
        dynamicRows, setDynamicRows
    }), [filters, dynamicRows, visible, dataContext]);

    return (
        <AdvancedFilteringContext.Provider value={context}>
            {children}
        </AdvancedFilteringContext.Provider>
    )
}

export const useAdvancedFilteringContext = () => {
    const context = useContext(AdvancedFilteringContext);
    if (isEmpty(context)) {
        throw new Error('useAdvancedFilteringContext must be used within a AdvancedFilteringContextProvider')
    }

    return context;
};
