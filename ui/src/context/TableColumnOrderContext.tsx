import React from 'react';
import {Tune} from "../model/Tune.ts";
import {TunesTableField} from "../utils/fields.ts";

export interface Properties {
    order: Array<keyof Tune>;
    setOrder: (order: Array<keyof Tune>) => void;
    sortedFields: TunesTableField[];
    shiftField: (field: keyof Tune, by: number) => void;
    shiftToStart: (field: keyof Tune) => void;
    shiftToEnd: (field: keyof Tune) => void;
}

export const TableColumnOrderContext = React.createContext<Properties>({} as Properties);
