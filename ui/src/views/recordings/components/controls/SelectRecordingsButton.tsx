import React from "react";
import {Button} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useModifications} from "../../../../hooks/useModifications.tsx";
import {TbCheckbox} from "react-icons/tb";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

const SelectRecordingsButton: React.FC = () => {

    const {t} = useTranslation();
    const {state, setState} = useControlState();
    const {modifications} = useModifications();

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    disabled={modifications.length > 0}
                    leftSection={<TbCheckbox size={Size.icon.MD}/>}
                    onClick={() => setState(ControlState.SELECT)}
                >
                    {t("view.recordings.controls.selection")}
                </Button>}
        </>

    );
}

export default SelectRecordingsButton;
