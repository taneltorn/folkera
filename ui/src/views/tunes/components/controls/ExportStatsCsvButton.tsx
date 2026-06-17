import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import ResponsiveButton from "../../../../components/buttons/ResponsiveButton.tsx";

const ExportStatsCsvButton: React.FC = () => {

    const {t} = useTranslation();
    const {filters} = useDataContext();
    const {exportStats} = useStatsContext();
    const {state} = useControlState();

    return (<>
            {state === ControlState.IDLE &&
                <ResponsiveButton
                    leftSection={<FaFileExport size={Size.icon.SM}/>}
                    label={t("page.tunes.controls.exportStats")}
                    onClick={() => exportStats(filters)}
                />}
        </>

    );
}

export default ExportStatsCsvButton;
