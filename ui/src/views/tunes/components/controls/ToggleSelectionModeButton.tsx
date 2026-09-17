import React from "react";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import ResponsiveButton from "../../../../components/buttons/ResponsiveButton.tsx";
import {BiSelectMultiple} from "react-icons/bi";

const ToggleSelectionModeButton: React.FC = () => {

    const {t} = useTranslation();
    const {setState} = useControlState();

    const handleChangeSelectionMode = () => {
        setState(ControlState.SELECTION);
    }

    return (
        <ResponsiveButton
            variant={"subtle"}
            size={"sm"}
            color={"dark.9"}
            leftSection={<BiSelectMultiple size={Size.icon.MD}/>}
            label={t("page.tunes.controls.select")}
            onClick={handleChangeSelectionMode}
        />
    );
}

export default ToggleSelectionModeButton;
