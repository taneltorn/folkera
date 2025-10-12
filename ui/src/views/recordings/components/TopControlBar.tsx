import React from "react";
import {Group} from "@mantine/core";
import RecordingSearch from "./search/RecordingSearch.tsx";
import RecordingFilters from "./search/RecordingFilters.tsx";
import AdvancedFilteringPanel from "./search/AdvancedFilteringPanel.tsx";
import {useAdvancedFilteringContext} from "../../../hooks/useAdvancedFilteringContext.tsx";
import AdvancedSearchToggle from "./search/AdvancedSearchToggle.tsx";

const TopControlBar: React.FC = () => {

    const {visible} = useAdvancedFilteringContext();

    return (<>
            <Group justify={"start"} mb={"md"}>
                <RecordingSearch/>
                <AdvancedSearchToggle/>
            </Group>

            {visible && <AdvancedFilteringPanel/>}
            <RecordingFilters/>
        </>
    );
}

export default TopControlBar;
