import React from "react";
import {Grid, Group} from "@mantine/core";
import RecordingSearch from "./search/RecordingSearch.tsx";
import RecordingFilters from "./search/RecordingFilters.tsx";
import SelectRecordingsButton from "./controls/SelectRecordingsButton.tsx";
import ExportCsvButton from "./controls/ExportCsvButton.tsx";
import SaveModificationsButtons from "./controls/SaveModificationsButtons.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";
import BulkModifyRecordingsButtons from "./controls/BulkModifyRecordingsButtons.tsx";
import AdvancedFilteringPanel from "./search/AdvancedFilteringPanel.tsx";
import {useAdvancedFilteringContext} from "../../../hooks/useAdvancedFilteringContext.tsx";
import AdvancedSearchToggle from "./search/AdvancedSearchToggle.tsx";

const TopControlBar: React.FC = () => {

    const {currentUser} = useAuth();
    const {visible} = useAdvancedFilteringContext();

    return (<>
            <Grid justify={"space-between"} mb={"md"}>
                <Grid.Col span={{base: 10, xs: 4, xl: 3}}>
                    <RecordingSearch/>
                </Grid.Col>
                <Grid.Col span={{base: 2, xs: 1}} >
                    <AdvancedSearchToggle/>
                </Grid.Col>

                <Grid.Col span={{base: 12, xs: 7, xl: 8}}>

                    <Group gap={4} justify={"end"} wrap={"nowrap"}>
                        {currentUser?.isAdmin && <>
                            <SaveModificationsButtons/>
                            <BulkModifyRecordingsButtons/>
                            <SelectRecordingsButton/>
                        </>}
                        <ExportCsvButton/>
                    </Group>
                </Grid.Col>
                    
            </Grid>

            {visible && <AdvancedFilteringPanel/>}

            <RecordingFilters/>
        </>
    );
}

export default TopControlBar;
