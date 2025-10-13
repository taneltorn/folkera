import React, {useContext, useEffect, useMemo, useState} from 'react';
import {generateFileName, isEmpty} from "../utils/helpers.tsx";
import {DataContext} from "../context/DataContext.tsx";
import {Recording} from "../model/Recording.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {DefaultHiddenFields, ItemsPerPageOptions} from "../utils/lists.ts";
import {Pagination, SortDirection} from "../model/Pagination.ts";
import {useDataService} from "../services/useDataService.ts";
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
    const dataService = useDataService();
    const optionsService = useOptionsService();
    const {exportCsv} = useDataExport();

    const [data, setData] = useState<Recording[]>([]);
    const [filteringOptions, setFilteringOptions] = useState<FilteringOptions>({});
    const [filters, setFilters] = useState<Filter[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [hiddenFields, setHiddenFields] = useLocalStorage<Array<keyof Recording>>("hiddenFields", DefaultHiddenFields);
    const [pagination, setPagination] = useLocalStorage<Pagination>("pagination", DefaultPagination);

    const loadData = (fs?: Filter[]) => {
        const filtersToUse = fs || filters || [];

        setFilters(filtersToUse);
        dataService.fetchRecordings(filtersToUse, pagination)
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

    const saveData = (data: Recording[]) => {
        dataService.saveData(data)
            .catch(error => {
                notify(t("toast.error.saveData"), ToastType.ERROR, error);
            });
    }

    const exportData = () => {
        dataService.fetchRecordings(filters, {sortField: "order", sortDirection: SortDirection.ASC})
            .then((result) => {
                const data = result.data;
                const filename = generateFileName("pillilood", filters);

                // @ts-ignore
                const headerTranslations: Record<keyof Recording, string> = {
                    id: t("recording.id"),
                    ref: t("recording.ref"),
                    content: t("recording.content"),
                    tune: t("recording.tune"),
                    year: t("recording.year"),
                    instrument: t("recording.instrument"),
                    dance: t("recording.dance"),
                    trainset: t("recording.trainset"),
                    performer: t("recording.performer"),
                    parish: t("recording.parish"),
                    origin: t("recording.origin"),
                    collector: t("recording.collector"),
                    notes: t("recording.notes"),
                    comments: t("recording.comments"),
                    archive: t("recording.archive"),
                    file: t("recording.file"),
                    order: t("recording.order"),
                    duration: t("recording.duration"),
                    distance: t("recording.distance"),
                };

                const transformedData = data.map(record => {
                    // @ts-ignore
                    const transformedRecord: Record<string, any> = {};
                    Object.keys(record).forEach((key) => {
                        const typedKey = key as keyof Recording;
                        transformedRecord[headerTranslations[typedKey] || typedKey] = record[typedKey];
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
                (!filter.type  || f.type  === filter.type)
            ))
        );
        setPagination({...pagination, page: 1});
    };

    const clearFilters = () => {
        setFilters([]);
        setPagination({...pagination, page: 1});
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
        totalItems,
        totalPages,

        isLoading: dataService.isLoading,

        pagination, setPagination,

        filters,
        addFilter, setFilters,
        useFilter,
        removeFilter,
        clearFilters,

        hiddenFields, setHiddenFields,
        toggleField,

        filteringOptions
    }), [data, dataService.isLoading, filters, hiddenFields, filteringOptions, pagination]);

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
