import React from "react";
import {Group} from "@mantine/core";
import TuneSearch from "./search/TuneSearch.tsx";
import TuneFilters from "./search/TuneFilters.tsx";
import AdvancedFilteringPanel from "./search/AdvancedFilteringPanel.tsx";
import {useAdvancedFilteringContext} from "../../../hooks/useAdvancedFilteringContext.tsx";
import AdvancedSearchToggle from "./search/AdvancedSearchToggle.tsx";

const TopControlBar: React.FC = () => {

    const {visible} = useAdvancedFilteringContext();

    return (<>
            <Group gap={"xl"} align={"center"}>
                <Group gap={"xs"} justify={"start"}  wrap={"nowrap"}>
                    <TuneSearch/>
                    <AdvancedSearchToggle/>
                    <TuneFilters/>
                </Group>

            </Group>

            {visible && <AdvancedFilteringPanel/>}
        </>
    );
}

export default TopControlBar;
