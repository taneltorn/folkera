import React from 'react';
import { Tune } from '../model/Tune.ts';

export interface Properties {

    modifications: Tune[];
    addModification: (modification: Tune) => void;
    setModifications: (modifications: Tune[]) => void;
    clearModifications: () => void;
}

export const ModificationsContext = React.createContext<Properties>({} as Properties);
