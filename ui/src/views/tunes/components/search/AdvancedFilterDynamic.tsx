import React from "react";
import {Grid, Group} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import AdvancedFilterMenu from "./AdvancedFilterMenu.tsx";
import AdvancedFilterInput from "./AdvancedFilterInput.tsx";
import AdvancedFilterFieldSelector from "./AdvancedFilterFieldSelector.tsx";
import RemoveAdvancedFilterButton from "./RemoveAdvancedFilterButton.tsx";

interface Properties {
    id: string;
    filterKey: string;
    field: keyof Tune;
    options?: string[];
}

const AdvancedFilterDynamic: React.FC<Properties> = ({id, filterKey, field, options}) => {

    return (
        <Grid>
            <Grid.Col span={"content"}>
                <AdvancedFilterFieldSelector field={field} id={id}/>
            </Grid.Col>

            <Grid.Col span={"content"}>
                <AdvancedFilterInput filterKey={filterKey} field={field} options={options}/>
            </Grid.Col>

            <Grid.Col span={"content"}>
                <Group wrap={"nowrap"} gap={"xs"}>
                    <AdvancedFilterMenu filterKey={filterKey} field={field}/>
                    <RemoveAdvancedFilterButton id={id}/>
                </Group>
            </Grid.Col>
        </Grid>
    );
}

export default AdvancedFilterDynamic;
