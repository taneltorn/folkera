import React from 'react';

export enum View {
    TABLE,
    MAP,
    STATS,
}

export interface Properties {
    activeView: View;
    setActiveView: (value: View) => void;
}

export const ActiveViewContext = React.createContext<Properties>({} as Properties);
