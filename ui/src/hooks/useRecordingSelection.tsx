import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {Recording} from "../model/Recording.ts";
import {RecordingSelectionContext} from "../context/RecordingSelectionContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const RecordingSelectionContextProvider: React.FC<Properties> = ({children}) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const [selection, setSelection] = useState<Recording[]>([]);

    const addToSelection = (recording: Recording) => {
        selection.push(recording);
        setSelection([...selection]);
    }

    const removeFromSelection = (recording: Recording) => {
        setSelection(selection.filter(r => r.id !== recording.id));
    }
    
    const toggleSelection = (recording: Recording) => {
        if (selection.find(r => r.id === recording.id)) {
            removeFromSelection(recording);
            return;
        }
        addToSelection(recording);
    }
    
    const clearSelection = () => {
        setSelection([]);
    }

    const context = useMemo(() => ({
        isActive, setIsActive,
        selection, setSelection,
        addToSelection,
        removeFromSelection,
        toggleSelection,
        clearSelection,
    }), [isActive, selection]);

    return (
        <RecordingSelectionContext.Provider value={context}>
            {children}
        </RecordingSelectionContext.Provider>
    )
}

export const useRecordingSelection = () => {
    const context = useContext(RecordingSelectionContext);
    if (isEmpty(context)) {
        throw new Error('useRecordingSelection must be used within a RecordingSelectionContextProvider')
    }

    return context;
};
