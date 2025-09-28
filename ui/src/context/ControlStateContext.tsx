import React from 'react';
import {ControlState} from "../model/ControlState.ts";

export interface Properties {

    state: ControlState;
    setState: (state: ControlState) => void;
}

export const ControlStateContext = React.createContext<Properties>({} as Properties);
