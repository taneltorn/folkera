import React from 'react';
import { Recording } from '../model/Recording.ts';

export interface Properties {

    selection: Recording[];
    setSelection: (values: Recording[]) => void;
    addToSelection: (value: Recording) => void;
    removeFromSelection: (value: Recording) => void;
    toggleSelection: (value: Recording) => void;
    clearSelection: () => void;
}

export const RecordingSelectionContext = React.createContext<Properties>({} as Properties);
