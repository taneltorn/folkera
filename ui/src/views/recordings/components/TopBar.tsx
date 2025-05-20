import React from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Button, Group} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import RecordingSearch from "./RecordingSearch.tsx";
import RecordingFilters from "./RecordingFilters.tsx";
import {useAuth} from "../../../hooks/useAuth.tsx";

const TopBar: React.FC = () => {

    const {t} = useTranslation();
    const {filters, clearFilters, exportData} = useDataContext();
    const auth = useAuth();
    
    return (
        <Group justify={"space-between"}>
            <Group>
                <RecordingSearch/>
                <RecordingFilters/>
            </Group>

            <Group gap={4}>
                {!!filters.length &&
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        leftSection={<LuFilterX size={Size.icon.SM}/>}
                        onClick={clearFilters}>
                        {t("view.recordings.controls.clearFilters")}
                    </Button>}

                <Button
                    variant={"subtle"}
                    size={"sm"}
                    disabled={!auth.currentUser?.isUser}
                    color={"dark"}
                    leftSection={<FaFileExport size={Size.icon.SM}/>}
                    onClick={exportData} px={"xs"} mx={0}>
                    {t("view.recordings.controls.export")}
                </Button>
            </Group>
        </Group>
    );
}

export default TopBar;
