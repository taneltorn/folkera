import React from 'react';
import {MapOptions} from "../model/MapOptions.ts";

export interface Properties {
    options: MapOptions;
    setOptions: (value: MapOptions) => void;
}

export const MapOptionsContext = React.createContext<Properties>({} as Properties);
