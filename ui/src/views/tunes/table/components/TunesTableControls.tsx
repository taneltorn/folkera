import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import LabelValue from "../../../../components/LabelValue.tsx";
import ExportTunesCsvButton from "../../components/controls/ExportTunesCsvButton.tsx";
import SelectTunesButton from "../../components/controls/SelectTunesButton.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import VisibleFieldsSelector from "./VisibleFieldsSelector.tsx";

const TunesTableControls: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {totalItems} = useDataContext();

    return (
        <Group gap={4}>
            <LabelValue
                label={t("view.tunes.table.results")}
                value={totalItems}
                mr={"md"}
            />

            {currentUser?.isAdmin && <SelectTunesButton/>}
            <ExportTunesCsvButton/>
            <VisibleFieldsSelector/>
        </Group>
    );
}

export default TunesTableControls;
