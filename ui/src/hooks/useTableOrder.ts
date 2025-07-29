import {useMemo} from "react";
import {Recording} from "../model/Recording.ts";
import useLocalStorage from "./useLocalStorage.tsx";
import {useDataContext} from "./useDataContext.tsx";

export interface RecordingTableField {
    field: keyof Recording;
    sortField?: keyof Recording;
    type: "input" | "select";
    split?: string; 
}

export const fields: RecordingTableField[] = [
    {field: "ref", sortField: "order", type: "input"},
    {field: "content", type: "input"},
    {field: "tune", type: "select"},
    {field: "datatype", type: "select", split: ","},
    {field: "dance", type: "select", split: ","},
    {field: "year", type: "select", split: ","},
    {field: "instrument", type: "select", split: ","},
    {field: "performer", type: "select", split: ","},
    {field: "parish", type: "select", split: ","},
    {field: "origin", type: "select", split: ","},
    {field: "collector", type: "select", split: ","},
    {field: "archive", type: "select"},
    {field: "notes", type: "select"},
    {field: "file", type: "select"},
    {field: "duration", type: "select"},
    {field: "comments", type: "select"}
];

const defaultOrder: Array<keyof Recording> = [
    "ref", "content", "tune", "year", "dance",
    "instrument", "performer", "parish", "origin", "collector",
    "archive", "notes", "file", "datatype", "duration", "comments"
];

function normalizeOrder(
    order: Array<keyof Recording>,
    fields: RecordingTableField[],
    hiddenFields: Array<keyof Recording>
): Array<keyof Recording> {
    const allVisible = fields.map(f => f.field).filter(f => !hiddenFields.includes(f));
    return [...order, ...allVisible.filter(f => !order.includes(f))];
}

export function useTableOrder() {

    const {hiddenFields} = useDataContext();
    const [order, setOrder] = useLocalStorage<Array<keyof Recording>>("table.columnOrder",
        defaultOrder.filter(f => !hiddenFields.includes(f)));

    const handleSetOrder = (newOrder: Array<keyof Recording>) => {
        const normalized = normalizeOrder(newOrder, fields, hiddenFields);
        setOrder(normalized);
    };
    
    const sortedFields = useMemo(() => {
        return [...fields]
            .filter(f => !hiddenFields.includes(f.field))
            .sort((a, b) => {
                const ai = order.indexOf(a.field);
                const bi = order.indexOf(b.field);
                return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
            });
    }, [order, hiddenFields]);

    return {
        sortedFields,
        order,
        setOrder: handleSetOrder,
    };
}