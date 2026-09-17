import React from "react";
import {Checkbox} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import {useTuneSelection} from "../../../../hooks/useTuneSelection.tsx";

interface Properties {
    tune: Tune;
}

const TuneChecker: React.FC<Properties> = ({tune}) => {

    const {selection, setSelection} = useTuneSelection();

    const handleSelect = () => {
        const isSelected = !!selection.find(s => s.ref === tune.ref);
        if (isSelected) {
            setSelection(selection.filter(s => s.ref !== tune.ref));
            return;
        }
        setSelection([...selection, tune]);
    }

    return (
        <Checkbox
            checked={!!selection.find(s => s.ref === tune.ref)}
            onClick={handleSelect}
        />
    );
}

export default TuneChecker;
