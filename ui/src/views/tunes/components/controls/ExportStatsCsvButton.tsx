import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";

const ExportStatsCsvButton: React.FC = () => {

    const {t} = useTranslation();
    const {filters} = useDataContext();
    const {exportStats} = useStatsContext();
    const {state} = useControlState();

    return (<>
        {state === ControlState.IDLE &&
            <Button
                variant={"subtle"}
                size={"sm"}
                color={"dark"}
                leftSection={<FaFileExport size={Size.icon.SM}/>}
                onClick={() => exportStats(filters)} px={"xs"} mx={0}>
                {t("view.tunes.controls.exportStats")}
            </Button>}
        </>

    );
}

export default ExportStatsCsvButton;
