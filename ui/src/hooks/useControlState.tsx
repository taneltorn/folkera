import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {ControlStateContext} from "../context/ControlStateContext.tsx";
import {ControlState} from "../model/ControlState.ts";

interface Properties {
    children: React.ReactNode;
}

export const ControlStateContextProvider: React.FC<Properties> = ({children}) => {

    const [state, setState] = useState<ControlState>(ControlState.IDLE);

    const context = useMemo(() => ({
        state,
        setState,
    }), [state]);

    return (
        <ControlStateContext.Provider value={context}>
            {children}
        </ControlStateContext.Provider>
    )
}

export const useControlState = () => {
    const context = useContext(ControlStateContext);
    if (isEmpty(context)) {
        throw new Error('useControlState must be used within a ControlStateContextProvider')
    }

    return context;
};
