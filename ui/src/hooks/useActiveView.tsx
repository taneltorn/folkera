import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/common.helpers.tsx";
import {View, ActiveViewContext} from '../context/ActiveViewContext.tsx';

interface Properties {
    children: React.ReactNode;
}

export const ActiveViewContextProvider: React.FC<Properties> = ({children}) => {

    const [activeView, setActiveView] = useState<View>(View.TABLE);

    const context = useMemo(() => ({
        activeView, setActiveView,
    }), [activeView]);

    return (
        <ActiveViewContext.Provider value={context}>
            {children}
        </ActiveViewContext.Provider>
    )
}

export const useActiveView = () => {
    const context = useContext(ActiveViewContext);
    if (isEmpty(context)) {
        throw new Error('useActiveView must be used within a ActiveViewContextProvider')
    }

    return context;
};
