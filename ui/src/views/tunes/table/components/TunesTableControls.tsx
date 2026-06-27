import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import LabelValue from "../../../../components/LabelValue.tsx";
import ExportTunesCsvButton from "../../components/controls/ExportTunesCsvButton.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import VisibleFieldsSelector from "./VisibleFieldsSelector.tsx";
import ToggleEditModeButton from "../../components/controls/ToggleEditModeButton.tsx";
import SaveModificationsButtons from "../../components/controls/SaveModificationsButtons.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

const TunesTableControls: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {totalItems} = useDataContext();
    const {state} = useControlState();

    return (
        <Group gap={4}>
            {state === ControlState.EDIT
                ? <SaveModificationsButtons/>
                : <>
                    <LabelValue
                        label={t("page.tunes.table.results")}
                        value={totalItems}
                        mr={"md"}
                    />

                    <ExportTunesCsvButton/>
                    <VisibleFieldsSelector/>
                    {currentUser?.isAdmin && <ToggleEditModeButton/>}

                </>}
        </Group>
    );
}

export default TunesTableControls;
