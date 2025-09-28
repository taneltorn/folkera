import React from "react";
import {Group} from "@mantine/core";
import RecordingSearch from "./search/RecordingSearch.tsx";
import {useModifications} from "../../../hooks/useModifications.tsx";
import RecordingFilters from "./search/RecordingFilters.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useRecordingSelection} from "../../../hooks/useRecordingSelection.tsx";
import SaveControls from "./controls/SaveControls.tsx";
import SelectionControls from "./controls/SelectionControls.tsx";
import ExportControls from "./controls/ExportControls.tsx";

const TopControlBar: React.FC = () => {

    const {currentUser} = useAuth();
    const {isActive} = useRecordingSelection();
    const {modifications} = useModifications();

    return (<>
            <Group justify={"space-between"} mb={"md"}>
                <RecordingSearch/>

                <Group gap={4}>
                    {modifications.length > 0 && currentUser?.isAdmin
                        ? <SaveControls/>
                        : <>
                            <SelectionControls/>
                            {!isActive && <ExportControls/>}
                        </>}
                </Group>
            </Group>

            <RecordingFilters/>
        </>
    );
}

export default TopControlBar;
