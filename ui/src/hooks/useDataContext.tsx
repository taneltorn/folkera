import React, {useContext, useEffect, useMemo, useState} from 'react';
import {generateFileName, isEmpty} from "../utils/helpers.tsx";
import {DataContext, Filter} from "../context/DataContext.tsx";
import {Recording} from "../model/Recording.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {DefaultHiddenFields, ItemsPerPageOptions} from "../utils/lists.ts";
import {Pagination, SortDirection} from "../model/Pagination.ts";
import {useDataService} from "../services/useDataService.tsx";
import {useTranslation} from "react-i18next";
import {NotificationType} from "../context/NotificationContext.tsx";
import {useNotifications} from "./useNotifications.tsx";
import Papa from "papaparse";
import {useOptionsService} from "../services/useOptionsService.tsx";
import {FilteringOptions} from "../model/FilteringOptions.ts";

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

    const {notify} = useNotifications();
    const dataService = useDataService();
    const optionsService = useOptionsService();

    const [data, setData] = useState<Recording[]>([]);
    const [filteringOptions, setFilteringOptions] = useState<FilteringOptions>({});
    const [filters, setFilters] = useState<Filter[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [hiddenFields, setHiddenFields] = useLocalStorage<Array<keyof Recording>>("hiddenFields", DefaultHiddenFields);
    const [pagination, setPagination] = useLocalStorage<Pagination>("pagination", DefaultPagination);

    const loadData = () => {
        dataService.fetchData(filters, pagination)
            .then((result) => {
                setData(result.data);
                setTotalItems(result.page.totalItems);
                setTotalPages(result.page.totalPages);
            })
            .catch(error => {
                notify(t("toast.error.fetchData"), NotificationType.ERROR, error);
            });
    }

    const loadFilteringOptions = () => {
        optionsService.fetchOptions(filters)
            .then(result => setFilteringOptions(result))
            .catch(error => {
                notify(t("toast.error.fetchOptions"), NotificationType.ERROR, error);
            });
    }

    const saveData = (data: Recording[]) => {
        dataService.saveData(data)
            .catch(error => {
                notify(t("toast.error.saveData"), NotificationType.ERROR, error);
            });
    }

    const exportData = () => {
        dataService.fetchData(filters, {sortField: "order", sortDirection: SortDirection.ASC})
            .then((result) => {
                const data = result.data;
                const filename = generateFileName(filters);

                const headerTranslations: Record<keyof Recording, string> = {
                    ref: t("recording.ref"),
                    content: t("recording.content"),
                    tune: t("recording.tune"),
                    year: t("recording.year"),
                    instrument: t("recording.instrument"),
                    dance: t("recording.dance"),
                    datatype: t("recording.datatype"),
                    performer: t("recording.performer"),
                    parish: t("recording.parish"),
                    origin: t("recording.origin"),
                    collector: t("recording.collector"),
                    notes: t("recording.notes"),
                    comments: t("recording.comments"),
                    archive: t("recording.archive"),
                    file: t("recording.file"),
                    order: t("recording.order"),
                    kivike: t("recording.kivike"),
                    duration: t("recording.duration"),
                    quality: t("recording.quality"),
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
                const csvData = Papa.unparse(transformedData);

                const blob = new Blob([csvData]);
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                notify(t("toast.error.exportData"), NotificationType.ERROR, error);
            });
    }

    const addFilter = (field: string, values: string[]) => {
        const filterList = filters.filter(f => f.field !== field);
        values.forEach(value => {
            if (value) {
                filterList.push({field: field, value: value});
            }
        });

        setFilters(filterList);
        setPagination({...pagination, page: 1});
    }

    const removeFilter = (field: string, value?: string) => {
        setFilters(filters.filter(f => !(f.field === field && (!value || f.value === value))));
        setPagination({...pagination, page: 1});
    }

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
    }, [data]);


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
