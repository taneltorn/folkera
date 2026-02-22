import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";

const ExportTunesCsvButton: React.FC = () => {

    const {t} = useTranslation();
    const {exportData} = useDataContext();
    const {state} = useControlState();

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    leftSection={<FaFileExport size={Size.icon.SM}/>}
                    onClick={exportData} px={"xs"} mx={0}>
                    {t("view.tunes.controls.export")}
                </Button>}
        </>
    );
}

export default ExportTunesCsvButton;
