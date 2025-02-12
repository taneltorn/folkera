import React from "react";
import {useDataContext} from "../../../hooks/useDataContext.tsx";
import {Button, Group} from "@mantine/core";
import {FaCheck, FaFileExport} from "react-icons/fa";
import {Size} from "../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {LuFilterX} from "react-icons/lu";
import {useModifications} from "../../../hooks/useModifications.tsx";
import RecordingSearch from "./RecordingSearch.tsx";
import RecordingFilters from "./RecordingFilters.tsx";
import {RxCross1} from "react-icons/rx";

const TopBar: React.FC = () => {

    const {t} = useTranslation();
    const {filters, clearFilters, exportData, saveData, loadData} = useDataContext();

    const {modifications, clearModifications} = useModifications();

    const handleSave = () => {
        saveData(modifications);
        clearModifications();
    };

    const handleClear = () => {
        loadData();
        clearModifications();
    };

    return (
        <Group px={"md"} justify={"space-between"} bg={"white"} mb={"xs"}>
            <Group>
                <RecordingSearch/>
                <RecordingFilters/>
            </Group>

            <Group gap={4}>

                {modifications.length > 0 && <>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"red"}
                        leftSection={<RxCross1 size={Size.icon.SM}/>}
                        onClick={handleClear}>
                        {t("view.recordings.controls.clear")}
                    </Button>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"green"}
                        leftSection={<FaCheck size={Size.icon.SM}/>}
                        onClick={handleSave}>
                        {t("view.recordings.controls.save")}
                    </Button>
                </>}

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
