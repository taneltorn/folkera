import React, {useContext, useEffect, useMemo, useState} from 'react';
import {generateFileName, isEmpty} from "../utils/helpers.tsx";
import {DataContext} from "../context/DataContext.tsx";
import {Tune} from "../model/Tune.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {DefaultVisibleFields, ItemsPerPageOptions} from "../utils/lists.ts";
import {Pagination, SortDirection} from "../model/Pagination.ts";
import {useTuneService} from "../services/useTuneService.ts";
import {useTranslation} from "react-i18next";
import {ToastType} from "../context/ToastContext.tsx";
import {useToasts} from "./useToasts.tsx";
import {useOptionsService} from "../services/useOptionsService.ts";
import {FilteringOptions} from "../model/FilteringOptions.ts";
import {Filter} from "../model/Filter.ts";
import {useDataExport} from "./useDataExport.tsx";

const DefaultPagination: Pagination = {
    size: ItemsPerPageOptions[0],
    page: 1,
    sortField: "order",
    sortDirection: SortDirection.ASC,
}

interface Properties {
    children: React.ReactNode;
}

export const DataContextProvider: React.FC<Properties> = ({children}) => {

    const {t} = useTranslation();

    const {notify} = useToasts();
    const dataService = useTuneService();
    const optionsService = useOptionsService();
    const {exportCsv} = useDataExport();

    const [data, setData] = useState<Tune[]>([]);
    const [filteringOptions, setFilteringOptions] = useState<FilteringOptions>({});
    const [filters, setFilters] = useState<Filter[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [visibleFields, setVisibleFields] = useLocalStorage<Array<keyof Tune>>("visibleFields", DefaultVisibleFields);
    const [pagination, setPagination] = useLocalStorage<Pagination>("pagination", DefaultPagination);

    const tuneIds = useMemo(() => {
        return data.map(t => t.id) || [];
    }, [data]);

    const loadData = (fs?: Filter[]) => {
        const filtersToUse = fs || filters || [];

        setFilters(filtersToUse);
        dataService.fetchTunes(filtersToUse, pagination)
            .then((result) => {
                setData(result.data);
                setTotalItems(result.page.totalItems);
                setTotalPages(result.page.totalPages);
            })
            .catch(error => {
                notify(t("toast.error.fetchData"), ToastType.ERROR, error);
            });
    }

    const loadFilteringOptions = () => {
        optionsService.fetchOptions(filters)
            .then(result => setFilteringOptions(result))
            .catch(error => {
                notify(t("toast.error.fetchOptions"), ToastType.ERROR, error);
            });
    }

    const saveData = (data: Tune[]) => {
        dataService.saveTunes(data)
            .catch(error => {
                notify(t("toast.error.saveData"), ToastType.ERROR, error);
            });
    }

    const exportData = () => {
        dataService.fetchTunes(filters, {sortField: "order", sortDirection: SortDirection.ASC})
            .then((result) => {
                const data = result.data;
                const filename = generateFileName("pillilood", filters);

                // @ts-ignore
                const exportableFields: Record<keyof Tune, string> = {
                    id: t("tune.id"),
                    ref: t("tune.ref"),
                    content: t("tune.content"),
                    melody: t("tune.melody"),
                    year: t("tune.year"),
                    instrument: t("tune.instrument"),
                    performer: t("tune.performer"),
                    parish: t("tune.parish"),
                    collector: t("tune.collector"),
                    dance: t("tune.dance"),
                    origin: t("tune.origin"),
                    notes: t("tune.notes"),
                    audioRef: t("tune.audioRef"),
                    notationRef: t("tune.notationRef"),
                    order: t("tune.order"),
                };

                const transformedData = data.map(record => {
                    const transformedRecord: Record<string, any> = {};

                    (Object.keys(exportableFields) as Array<keyof Tune>).forEach((key) => {
                        transformedRecord[exportableFields[key]] = record[key];
                    });

                    return transformedRecord;
                });

                exportCsv(filename, transformedData);
            })
            .catch(error => {
                notify(t("toast.error.fetchData"), ToastType.ERROR, error);
            });
    }

    const addFilter = (filter: Filter, replace?: boolean) => {
        if (filters.find(f => f.field === filter.field && f.type === filter.type && f.value === filter.value)) {
            return;
        }

        const filterList: Filter[] = replace
            ? filters.filter(f => !(f.field === filter.field))
            : filters;

        filterList.push({...filter, type: filter.type || "contains"});

        setFilters(filterList);
        setPagination({...pagination, page: 1});
    }

    const useFilter = (filter: Filter) => {
        const filterList: Filter[] = filters.filter(f => !(f.field === filter.field && (!filter.type || f.type === filter.type)));
        filterList.push({...filter});

        setFilters(filterList);
        setPagination({...pagination, page: 1});
    }

    const removeFilter = (filter: Filter) => {
        setFilters(prev =>
            prev.filter(f => !(
                f.field === filter.field &&
                (!filter.value || f.value === filter.value) &&
                (!filter.type || f.type === filter.type)
            ))
        );
        setPagination({...pagination, page: 1});
    };

    const clearFilters = () => {
        setFilters([]);
        setPagination({...pagination, page: 1});
        window.history.replaceState({}, "");
    }

    const toggleField = (field: keyof Tune) => {
        if (visibleFields.includes(field)) {
            setVisibleFields(visibleFields.filter(c => c !== field));
            return;
        }

        visibleFields.push(field);
        setVisibleFields([...visibleFields]);
    }

    useEffect(() => {
        loadFilteringOptions();
        return () => optionsService.cancelSource.cancel();
    }, []);


    useEffect(() => {
        loadData();
        return () => dataService.cancelSource.cancel();
    }, [pagination]);

    const context = useMemo(() => ({
        loadData,
        saveData,
        exportData,

        data, setData,
        tuneIds,
        totalItems,
        totalPages,

        isLoading: dataService.isLoading,

        pagination, setPagination,

        filters,
        addFilter, setFilters,
        useFilter,
        removeFilter,
        clearFilters,

        visibleFields, setVisibleFields,
        toggleField,

        filteringOptions
    }), [data, dataService.isLoading, tuneIds, filters, visibleFields, filteringOptions, pagination]);

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (isEmpty(context)) {
        throw new Error('useDataContext must be used within a DataContextProvider')
    }

    return context;
};
