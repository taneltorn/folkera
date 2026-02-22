import React from 'react';
import { Tune } from '../model/Tune.ts';

export interface Properties {

    selection: Tune[];
    setSelection: (values: Tune[]) => void;
    addToSelection: (value: Tune) => void;
    removeFromSelection: (value: Tune) => void;
    toggleSelection: (value: Tune) => void;
    clearSelection: () => void;
}

export const TuneSelectionContext = React.createContext<Properties>({} as Properties);
