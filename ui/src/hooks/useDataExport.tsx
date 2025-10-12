import React, {useContext, useMemo} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {useTranslation} from "react-i18next";
import {ToastType} from "../context/ToastContext.tsx";
import {useToasts} from "./useToasts.tsx";
import Papa from "papaparse";
import {ExportContext} from "../context/ExportContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const ExportContextProvider: React.FC<Properties> = ({children}) => {

    const {t} = useTranslation();
    const {notify} = useToasts();

    const exportCsv = (filename: string, data: any) => {
        try {
            const csvData = Papa.unparse(data);

            const blob = new Blob([csvData]);
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            notify(t("toast.error.exportData"), ToastType.ERROR, error);
        }
    }

    const context = useMemo(() => ({
        exportCsv,
    }), []);

    return (
        <ExportContext.Provider value={context}>
            {children}
        </ExportContext.Provider>
    )
}

export const useDataExport = () => {
    const context = useContext(ExportContext);
    if (isEmpty(context)) {
        throw new Error('useDataExport must be used within a ExportContextProvider')
    }

    return context;
};
