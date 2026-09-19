import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Divider, Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import LabelValue from "../../../../components/LabelValue.tsx";
import ExportTunesCsvButton from "../../components/controls/ExportTunesCsvButton.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import VisibleFieldsSelector from "./VisibleFieldsSelector.tsx";
import ToggleEditModeButton from "../../components/controls/ToggleEditModeButton.tsx";
import SaveModificationsButtons from "../../components/controls/SaveModificationsButtons.tsx";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import ToggleSelectionModeButton from "../../components/controls/ToggleSelectionModeButton.tsx";
import SelectionModeButtons from "../../components/controls/SelectionModeButtons.tsx";

const TunesTableControls: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {totalItems} = useDataContext();
    const {state} = useControlState();

    return (
        <Group gap={4}>
            {state === ControlState.EDIT
                ? <SaveModificationsButtons/>
                : (state === ControlState.SELECTION
                    ? <SelectionModeButtons/>
                    : <>
                        <LabelValue
                            label={t("page.tunes.table.results")}
                            value={totalItems}
                            mr={"md"}
                        />

                        <ExportTunesCsvButton/>
                        <VisibleFieldsSelector/>

                        {currentUser?.isAdmin && <>
                            <Divider mx={"md"} orientation={"vertical"} />
                            <ToggleEditModeButton/>
                            <ToggleSelectionModeButton/>
                        </>}
                    </>)}
        </Group>
    );
}

export default TunesTableControls;
