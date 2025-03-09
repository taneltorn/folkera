import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {ModificationsContext} from "../context/ModificationsContext.tsx";
import {Recording} from "../model/Recording.ts";

interface Properties {
    children: React.ReactNode;
}

export const ModificationsContextProvider: React.FC<Properties> = ({children}) => {

    const [modifications, setModifications] = useState<Recording[]>([]);

    const addModification = (modification: Recording) => {
        setModifications([...modifications, modification]);
    }

    const clearModifications = () => {
        setModifications([]);
    }

    const context = useMemo(() => ({
        modifications,
        addModification,
        clearModifications,
    }), [modifications]);

    return (
        <ModificationsContext.Provider value={context}>
            {children}
        </ModificationsContext.Provider>
    )
}

export const useModifications = () => {
    const context = useContext(ModificationsContext);
    if (isEmpty(context)) {
        throw new Error('useModifications must be used within a ModificationsContextProvider')
    }

    return context;
};
