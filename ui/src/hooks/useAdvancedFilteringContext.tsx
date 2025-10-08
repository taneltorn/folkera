import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {AdvancedFilteringContext} from "../context/AdvancedFilteringContext.tsx";
import {Filter} from "../model/Filter.ts";
import {useDataContext} from "./useDataContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const AdvancedFilteringContextProvider: React.FC<Properties> = ({children}) => {

    const dataContext = useDataContext();

    const [visible, setVisible] = useState<boolean>(false);
    const [filters, setFilters] = useState<Filter[]>([]);

    const updateFilter = (field: string, filter: Filter) => {
        const filterList = filters.filter(f => f.field !== field);
        filterList.push(filter);
        setFilters(filterList);
    }

    const clearFilter = (field: string) => {
        const filterList = filters.filter(f => f.field !== field);
        setFilters(filterList);
    }

    const context = useMemo(() => ({
        visible, setVisible,
        filters,
        setFilters,
        updateFilter,
        clearFilter,
    }), [filters, visible, dataContext]);

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
