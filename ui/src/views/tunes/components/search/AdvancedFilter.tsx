import React from "react";
import {Grid} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import AdvancedFilterMenu from "./AdvancedFilterMenu.tsx";
import AdvancedFilterInput from "./AdvancedFilterInput.tsx";

interface Properties {
    filterKey: string;
    field: keyof Tune;
    options?: string[];
}

const AdvancedFilter: React.FC<Properties> = ({filterKey, field, options}) => {

    return (
        <Grid>
            <Grid.Col span={{base: 6, lg: 4}}>
                <AdvancedFilterInput filterKey={filterKey} field={field} options={options}/>
            </Grid.Col>

            <Grid.Col span={{base: 6, lg: 3}}>
                <AdvancedFilterMenu filterKey={filterKey} field={field}/>
            </Grid.Col>
        </Grid>
    );
}

export default AdvancedFilter;
