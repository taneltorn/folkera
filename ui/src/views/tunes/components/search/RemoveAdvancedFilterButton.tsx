import React from "react";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import IconButton from "../../../../components/buttons/IconButton.tsx";

interface Properties {
    filterKey: string;
}

const RemoveAdvancedFilterButton: React.FC<Properties> = ({filterKey}) => {

    const {setFilters, dynamicRows, setDynamicRows} = useAdvancedFilteringContext();

    const removeDynamicRow = (filterKey: string) => {
        const rows = [...dynamicRows];

        const row = rows.find(r => r.filterKey === filterKey);
        if (!row) return;

        const nextRows = rows.filter(r => r.filterKey !== filterKey);
        setDynamicRows(nextRows);

        // @ts-ignore
        setFilters(prev => prev.filter(f => f.filterKey !== row.filterKey));
    };

    return (
        <IconButton
            type={"remove"}
            onClick={() => removeDynamicRow(filterKey)}
        />
    );
};

export default RemoveAdvancedFilterButton;