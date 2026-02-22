import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {Tune} from "../model/Tune.ts";
import {TuneSelectionContext} from "../context/TuneSelectionContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const TuneSelectionContextProvider: React.FC<Properties> = ({children}) => {

    const [selection, setSelection] = useState<Tune[]>([]);

    const addToSelection = (tune: Tune) => {
        selection.push(tune);
        setSelection([...selection]);
    }

    const removeFromSelection = (tune: Tune) => {
        setSelection(selection.filter(r => r.id !== tune.id));
    }

    const toggleSelection = (tune: Tune) => {
        if (selection.find(r => r.id === tune.id)) {
            removeFromSelection(tune);
            return;
        }
        addToSelection(tune);
    }

    const clearSelection = () => {
        setSelection([]);
    }

    const context = useMemo(() => ({
        selection, setSelection,
        addToSelection,
        removeFromSelection,
        toggleSelection,
        clearSelection,
    }), [selection]);

    return (
        <TuneSelectionContext.Provider value={context}>
            {children}
        </TuneSelectionContext.Provider>
    )
}

export const useTuneSelection = () => {
    const context = useContext(TuneSelectionContext);
    if (isEmpty(context)) {
        throw new Error('useTuneSelection must be used within a TuneSelectionContextProvider')
    }

    return context;
};
