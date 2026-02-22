import {useMemo} from "react";
import {Tune} from "../model/Tune.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {useDataContext} from "./useDataContext.tsx";

export interface TunesTableField {
    field: keyof Tune;
    sortField?: keyof Tune;
    type: "input" | "select";
    split?: string;
}

export const fields: TunesTableField[] = [
    {field: "ref", sortField: "order", type: "input"},
    {field: "content", type: "input"},
    {field: "melody", type: "select", split: ";"},
    {field: "year", type: "select", split: ","},
    {field: "instrument", type: "select", split: ","},
    {field: "performer", type: "select", split: ","},
    {field: "parish", type: "select", split: ","},
    {field: "county", type: "select", split: ","},
    {field: "origin", type: "select", split: ","},
    {field: "collector", type: "select", split: ","},
    {field: "notes", type: "select"},
    {field: "dance", type: "select", split: ","},
    {field: "notationRef", type: "input"},
    {field: "audioRef", type: "input"},
];

export const technicalFields: TunesTableField[] = [
    {field: "datatype", type: "input"},
    {field: "audio", type: "input"},
    {field: "notation", type: "input"},
    {field: "duration", type: "select"},
    {field: "trainset", type: "select", split: ","},
    {field: "comments", type: "select"},
    {field: "order", type: "input"},
];

export const fieldList = [...fields, ...technicalFields];
const defaultOrder: Array<keyof Tune> = fieldList.map(f => f.field) as Array<keyof Tune>;

function normalizeOrder(
    order: Array<keyof Tune>,
    fields: TunesTableField[],
    visibleFields: Array<keyof Tune>
): Array<keyof Tune> {
    const allVisible = fields.map(f => f.field).filter(f => visibleFields.includes(f));
    return [...order, ...allVisible.filter(f => !order.includes(f))];
}

export function useTableOrder() {

    const {visibleFields} = useDataContext();
    const [order, setOrder] = useLocalStorage<Array<keyof Tune>>("table.columnOrder",
        defaultOrder.filter(f => visibleFields.includes(f)));

    const handleSetOrder = (newOrder: Array<keyof Tune>) => {
        const normalized = normalizeOrder(newOrder, fieldList, visibleFields);
        setOrder(normalized);
    };

    const sortedFields = useMemo(() => {
        return fieldList
            .filter(f => visibleFields.includes(f.field))
            .sort((a, b) => {
                const ai = order.indexOf(a.field);
                const bi = order.indexOf(b.field);
                return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
            });
    }, [order, visibleFields]);

    return {
        sortedFields,
        order,
        setOrder: handleSetOrder,
    };
}