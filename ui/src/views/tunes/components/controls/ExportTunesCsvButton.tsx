import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import ResponsiveButton from "../../../../components/buttons/ResponsiveButton.tsx";

const ExportTunesCsvButton: React.FC = () => {

    const {t} = useTranslation();
    const {exportData} = useDataContext();
    const {state} = useControlState();

    if (state !== ControlState.IDLE) return null;

    return (
        <ResponsiveButton
            leftSection={<FaFileExport size={Size.icon.SM}/>}
            label={t("page.tunes.controls.export")}
            onClick={exportData}
        />
    );
};

export default ExportTunesCsvButton;
