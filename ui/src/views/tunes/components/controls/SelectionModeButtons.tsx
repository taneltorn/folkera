import React from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";
import AssignAccessButton from "../../../admin/users/components/AssignAccessButton.tsx";

const SelectionModeButtons: React.FC = () => {

    const {t} = useTranslation();
    const {state, setState} = useControlState();
    const {selection, setSelection} = useTuneSelection();

    const handleClear = () => {
        setState(ControlState.IDLE);
        setSelection([]);
    };

    return (<>
            {state === ControlState.SELECTION && <>
                <AssignAccessButton
                    selectedTunes={selection}
                    disabled={!selection.length}
                    onSave={handleClear}
                />

                <Button
                    variant={"subtle"}
                    size={"sm"}
                    radius={"xl"}
                    color={"dark.9"}
                    onClick={handleClear}>
                    {t("page.tunes.controls.clear")}
                </Button>
            </>}
        </>
    );
}

export default SelectionModeButtons;
