import React from 'react';

export interface Properties {
    exportCsv: (filename: string, data: any) => void;
}

export const ExportContext = React.createContext<Properties>({} as Properties);
