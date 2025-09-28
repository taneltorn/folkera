import React from "react";
import {Group} from "@mantine/core";
import RecordingSearch from "./search/RecordingSearch.tsx";
import RecordingFilters from "./search/RecordingFilters.tsx";
import SelectRecordingsButton from "./controls/SelectRecordingsButton.tsx";
import ExportCsvButton from "./controls/ExportCsvButton.tsx";
import SaveModificationsButtons from "./controls/SaveModificationsButtons.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";
import BulkModifyRecordingsButtons from "./controls/BulkModifyRecordingsButtons.tsx";

const TopControlBar: React.FC = () => {

    const {currentUser} = useAuth();

    return (<>
            <Group justify={"space-between"} mb={"md"}>
                <RecordingSearch/>

                <Group gap={4}>
                    {currentUser?.isAdmin && <>
                        <SaveModificationsButtons/>
                        <BulkModifyRecordingsButtons/>
                        <SelectRecordingsButton/>
                    </>}
                    <ExportCsvButton/>
                </Group>
            </Group>

            <RecordingFilters/>
        </>
    );
}

export default TopControlBar;
