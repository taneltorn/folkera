import React from 'react';
import { Recording } from '../model/Recording.ts';

export interface Properties {

    modifications: Recording[];
    addModification: (modification: Recording) => void;
    clearModifications: () => void;
}

export const ModificationsContext = React.createContext<Properties>({} as Properties);
