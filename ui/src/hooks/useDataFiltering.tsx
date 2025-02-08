import React, {useContext, useEffect, useMemo, useState} from 'react';
import {isEmpty} from "../utils/common.helpers.tsx";
import {DataFilteringContext, Filter, Sort, SortDirection} from "../context/DataFilteringContext.tsx";
import {Recording} from "../../../domain/Recording.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {ItemsPerPageOptions, Years} from "../utils/common.lists.ts";
import {extractAndSort, filter, sortByField, withBlankOptions} from "../utils/filtering.helpers.ts";
import {Parishes} from "../../../domain/common.lists.ts";

interface Properties {
    data: Recording[];
    filters: Filter[];
    children: React.ReactNode;
}

export const DataFilteringContextProvider: React.FC<Properties> = ({data, children, ...props}) => {

    const [filters, setFilters] = useState<Filter[]>(props.filters || []);
    const [hiddenFields, setHiddenFields] = useLocalStorage<Array<keyof Recording>>("hiddenFields", ["collector", "archive", "notes"]);

    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useLocalStorage("itemsPerPage", ItemsPerPageOptions[0]);
    const [sort, setSort] = useState<Sort | undefined>({field: "order", direction: SortDirection.ASC});

    const addFilter = (field: string, values: string[]) => {
        const filterList = filters.filter(f => f.field !== field);
        values.forEach(value => {
            if (value) {
                filterList.push({field: field, value: value});
            }
        });

        setFilters(filterList);
        setActivePage(1);
    }

    const removeFilter = (field: string, value?: string) => {
        setFilters(filters.filter(f => !(f.field === field && (!value || f.value === value))));
        setActivePage(1);
    }

    const clearFilters = () => {
        setFilters([]);
        setActivePage(1);
        window.history.replaceState({}, "");
    }

    const toggleField = (field: keyof Recording) => {
        if (hiddenFields.includes(field)) {
            setHiddenFields(hiddenFields.filter(c => c !== field));
            return;
        }
        hiddenFields.push(field);
        setHiddenFields([...hiddenFields]);
    }
    
    const filteredData = useMemo<Recording[]>(() => {
        if (!data) {
            return [];
        }
        const filtered = filter(data, filters);
        return sortByField(filtered, sort?.field, sort?.direction) || [];
    }, [data, filters, sort]);


    const filteringOptions = useMemo(() => ({
        tune: withBlankOptions(extractAndSort(data, "tune")),
        archive: extractAndSort(data, "archive"),
        instrument: withBlankOptions(extractAndSort(data, "instrument", ",")),
        dance: withBlankOptions(extractAndSort(data, "dance", ",")),
        datatype: withBlankOptions(extractAndSort(data, "datatype", ",")),
        performer: withBlankOptions(extractAndSort(data, "performer", ",")),
        collector: withBlankOptions(extractAndSort(data, "collector", ",")),
        comments: withBlankOptions([]),
        quality: withBlankOptions(extractAndSort(data, "quality", ",")),
        // location: withBlankOptions(extractAndSort(data, "location", ",")),
        location: withBlankOptions([{group: "\n ˇˇˇˇˇ", items: Parishes}]),
        year: Years,
        
    }), [data]);

    useEffect(() => {
        if (props.filters?.length) {
            setFilters(props.filters);
        }
    }, [props.filters]);

    const context = useMemo(() => ({
        filters, setFilters,
        hiddenFields, setHiddenFields,
        toggleField,
        sort, setSort,

        addFilter,
        removeFilter,
        clearFilters,
        activePage, setActivePage,
        itemsPerPage, setItemsPerPage,

        filteredData,
        filteringOptions

    }), [filters, filteredData, hiddenFields, filteringOptions, filteredData, sort, activePage, itemsPerPage]);

    return (
        <DataFilteringContext.Provider value={context}>
            {children}
        </DataFilteringContext.Provider>
    )
}

export const useDataFiltering = () => {
    const context = useContext(DataFilteringContext);
    if (isEmpty(context)) {
        throw new Error('useDataFiltering must be used within a FilteringContextProvider')
    }

    return context;
};
