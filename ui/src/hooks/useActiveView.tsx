import React, {useContext, useEffect, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {View, ActiveViewContext} from '../context/ActiveViewContext.tsx';
import {useSearchParams} from "react-router-dom";

interface Properties {
    children: React.ReactNode;
}

export const ActiveViewContextProvider: React.FC<Properties> = ({children}) => {

    const [activeView, setActiveView] = useState<View>(View.TABLE);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const handleViewChange = (view: View) => {
        setActiveView(view);
        setSearchParams({...searchParams, view: view});
    }
    
    const context = useMemo(() => ({
        activeView, setActiveView: handleViewChange,
    }), [activeView]);

    useEffect(() => {
        const view = searchParams.get("view");
        if (view && Object.values(View).includes(view as View)) {
            setActiveView(view as View);
        }
    }, [searchParams]);

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
