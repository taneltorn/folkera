import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useNavigate} from "react-router-dom";
import {GrFormPreviousLink} from "react-icons/gr";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    tune: Tune;
}

const PreviousTuneButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {tuneIds} = useDataContext();

    const handleNext = () => {
        const index = tuneIds.findIndex(id => id === tune.id);
        if (index > 0) {
            const previousId = tuneIds[index - 1];
            if (previousId) {
                navigate(`/tunes/${previousId}`);
            }
        }
    }


    return (
        <Button
            title={t("button.previous")}
            size={"sm"}
            color={"red"}
            variant={"subtle"}
            disabled={tune.id === tuneIds[0]}
            onClick={handleNext}
        >
            <GrFormPreviousLink size={Size.icon.MD}/>
        </Button>
    );
}

export default PreviousTuneButton;
