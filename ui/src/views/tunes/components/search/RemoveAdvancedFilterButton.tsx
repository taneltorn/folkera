import React from "react";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import IconButton from "../../../../components/buttons/IconButton.tsx";

interface Properties {
    id: string;
}

const RemoveAdvancedFilterButton: React.FC<Properties> = ({id}) => {

    const {setFilters, dynamicRows, setDynamicRows} = useAdvancedFilteringContext();

    const removeDynamicRow = (id: string) => {
        const rows = [...dynamicRows];
        const row = rows.find(r => r.id === id);
        if (!row) return;

        const nextRows = rows.filter(r => r.id !== id);
        setDynamicRows(nextRows);

        // @ts-ignore
        setFilters(prev => prev.filter(f => f.filterKey !== row.filterKey));
    };

    return (
        <IconButton
            type={"remove"}
            onClick={() => removeDynamicRow(id)}
        />
    );
};

export default RemoveAdvancedFilterButton;