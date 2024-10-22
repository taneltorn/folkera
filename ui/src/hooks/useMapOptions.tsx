import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/common.helpers.tsx";
import {MapOptions} from "../model/MapOptions.ts";
import {MapOptionsContext} from "../context/MapOptionsContext.tsx";
import {DefaultMapOptions} from "../utils/map.helpers.ts";

interface Properties {
    children: React.ReactNode;
}

export const MapOptionsContextProvider: React.FC<Properties> = ({children}) => {

    const [options, setOptions] = useState<MapOptions>(DefaultMapOptions);

    const context = useMemo(() => ({
        options, setOptions,
    }), [options]);

    return (
        <MapOptionsContext.Provider value={context}>
            {children}
        </MapOptionsContext.Provider>
    )
}

export const useMapOptions = () => {
    const context = useContext(MapOptionsContext);
    if (isEmpty(context)) {
        throw new Error('useMapOptions must be used within a MapOptionsContextProvider')
    }

    return context;
};
