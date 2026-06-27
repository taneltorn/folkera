import React from "react";
import {Button} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {AiFillEdit} from "react-icons/ai";

const ToggleEditModeButton: React.FC = () => {

    const {t} = useTranslation();
    const { setState} = useControlState();

    const handleChangeEditMode = () => {
        setState(ControlState.EDIT);
    }

    return (<>
            <Button
                variant={"subtle"}
                size={"sm"}
                color={"dark.9"}
                leftSection={<AiFillEdit size={Size.icon.MD}/>}
                onClick={handleChangeEditMode}
            >
                {t(`page.tunes.controls.edit`)}
            </Button>
        </>

    );
}

export default ToggleEditModeButton;
