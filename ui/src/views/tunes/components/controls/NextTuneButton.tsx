import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useNavigate} from "react-router-dom";
import {GrFormNextLink} from "react-icons/gr";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    tune: Tune;
}

const NextTuneButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {tuneIds} = useDataContext();

    const handleNext = () => {
        const index = tuneIds.findIndex(id => id === tune.id);
        if (index >= 0 && index <= tuneIds.length) {
            const nextId = tuneIds[index + 1];
            if (nextId) {
                navigate(`/tunes/${nextId}`);
            }
        }
    }


    return (
        <Button
            title={t("button.next")}
            size={"sm"}
            color={"red"}
            variant={"subtle"}
            disabled={tune.id === tuneIds[tuneIds.length - 1]}
            onClick={handleNext}
        >
            <GrFormNextLink size={Size.icon.MD}/>
        </Button>
    );
}

export default NextTuneButton;
