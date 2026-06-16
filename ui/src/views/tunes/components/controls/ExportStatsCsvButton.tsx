import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button} from "@mantine/core";
import {FaFileExport} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {ControlState} from "../../../../model/ControlState.ts";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const ExportStatsCsvButton: React.FC = () => {

    const {t} = useTranslation();
    const {filters} = useDataContext();
    const {exportStats} = useStatsContext();
    const {state} = useControlState();
    const bp = useCurrentBreakpoint();

    const icon = <FaFileExport size={Size.icon.SM}/>;

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    variant={"subtle"}
                    title={t("page.tunes.controls.exportStats")}
                    size={"sm"}
                    color={"dark.9"}
                    leftSection={bp !== "xxs" && icon}
                    onClick={() => exportStats(filters)} px={"xs"} mx={0}>
                    {bp === "xxs" ? icon : t("page.tunes.controls.exportStats")}

                </Button>}
        </>

    );
}

export default ExportStatsCsvButton;
