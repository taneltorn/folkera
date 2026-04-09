import React from 'react';

export interface Properties {
    index: number;
    setIndex: (value: number) => void;
}

export const ActiveVariantContext = React.createContext<Properties>({} as Properties);
