import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const ExportTunesCsvButton: React.FC = () => {

    const {t} = useTranslation();
    const {exportData} = useDataContext();
    const {state} = useControlState();
    const bp = useCurrentBreakpoint();

    const icon = <FaFileExport size={Size.icon.SM}/>;

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    variant={"subtle"}
                    title={t("page.tunes.controls.export")}
                    size={"sm"}
                    color={"dark.9"}
                    leftSection={bp !== "xxs" && icon}
                    onClick={exportData} px={"xs"} mx={0}>
                    {bp === "xxs" ? icon : t("page.tunes.controls.export")}
                </Button>}
        </>
    );
}

export default ExportTunesCsvButton;
