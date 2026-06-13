import React, {useContext, useMemo} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import useLocalStorage from "./useLocalStorage.tsx";
import {TableColumnOrderContext} from "../context/TableColumnOrderContext.tsx";
import {useDataContext} from "./useDataContext.tsx";
import {Tune} from "../model/Tune.ts";
import {arrayMove} from "@dnd-kit/sortable";
import {fields, technicalFields, TunesTableField} from "../utils/fields.ts";

interface Properties {
    children: React.ReactNode;
}

const fieldList = [...fields, ...technicalFields];
const defaultOrder: Array<keyof Tune> = fieldList.map(f => f.field) as Array<keyof Tune>;

function normalizeOrder(
    order: Array<keyof Tune>,
    fields: TunesTableField[],
    visibleFields: Array<keyof Tune>
): Array<keyof Tune> {
    const allVisible = fields.map(f => f.field).filter(f => visibleFields.includes(f));
    return [...order, ...allVisible.filter(f => !order.includes(f))];
}

export const TableColumnOrderContextProvider: React.FC<Properties> = ({children}) => {

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

    const shiftField = (field: keyof Tune, by: number) => {
        const visibleOrder = sortedFields.map(f => f.field);

        const oldVisibleIndex = visibleOrder.indexOf(field);
        if (oldVisibleIndex === -1) {
            return;
        }

        const newVisibleIndex = oldVisibleIndex + by;

        if (newVisibleIndex < 0 || newVisibleIndex >= visibleOrder.length) {
            return;
        }

        const targetField = visibleOrder[newVisibleIndex];

        const oldIndex = order.indexOf(field);
        const newIndex = order.indexOf(targetField);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        handleSetOrder(arrayMove(order, oldIndex, newIndex));
    };

    const shiftToStart = (field: keyof Tune) => {
        const visibleOrder = sortedFields.map(f => f.field);

        if (!visibleOrder.includes(field) || visibleOrder[0] === field) {
            return;
        }

        const oldIndex = order.indexOf(field);
        const firstVisibleIndex = order.indexOf(visibleOrder[0]);

        if (oldIndex === -1 || firstVisibleIndex === -1) {
            return;
        }

        handleSetOrder(arrayMove(order, oldIndex, firstVisibleIndex));
    };

    const shiftToEnd = (field: keyof Tune) => {
        const visibleOrder = sortedFields.map(f => f.field);

        if (!visibleOrder.includes(field) || visibleOrder[visibleOrder.length - 1] === field) {
            return;
        }

        const oldIndex = order.indexOf(field);
        const lastVisibleIndex = order.indexOf(visibleOrder[visibleOrder.length - 1]);

        if (oldIndex === -1 || lastVisibleIndex === -1) {
            return;
        }

        handleSetOrder(arrayMove(order, oldIndex, lastVisibleIndex));
    };

    const context = useMemo(() => ({
        sortedFields,
        shiftField, shiftToStart, shiftToEnd,
        order,
        setOrder: handleSetOrder,
    }), [order, sortedFields]);

    return (
        <TableColumnOrderContext.Provider value={context}>
            {children}
        </TableColumnOrderContext.Provider>
    )
}

export const useTableColumnOrderContext = () => {
    const context = useContext(TableColumnOrderContext);
    if (isEmpty(context)) {
        throw new Error('useTableColumnOrderContext must be used within a TableColumnOrderContextProvider')
    }

    return context;
};
