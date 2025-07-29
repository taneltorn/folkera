import React from 'react';

export enum View {
    TABLE = "table",
    MAP = "map",
    STATS = "stats",
    CLUSTER = "cluster",
}

export interface Properties {
    activeView: View;
    setActiveView: (value: View) => void;
}

export const ActiveViewContext = React.createContext<Properties>({} as Properties);
