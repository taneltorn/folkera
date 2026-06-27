import React from "react";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import ResponsiveButton from "../../../../components/buttons/ResponsiveButton.tsx";
import {MdOutlineEditRoad} from "react-icons/md";

const ToggleEditModeButton: React.FC = () => {

    const {t} = useTranslation();
    const {setState} = useControlState();

    const handleChangeEditMode = () => {
        setState(ControlState.EDIT);
    }

    return (
        <ResponsiveButton
            variant={"subtle"}
            size={"sm"}
            color={"dark.9"}
            leftSection={<MdOutlineEditRoad size={Size.icon.MD}/>}
            label={t("page.tunes.controls.edit")}
            onClick={handleChangeEditMode}
        />
    );
}

export default ToggleEditModeButton;
