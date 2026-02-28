import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useNavigate} from "react-router-dom";
import {GrFormNextLink} from "react-icons/gr";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    currentId: string;
}

const NextTuneButton: React.FC<Properties> = ({currentId}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {tuneIds} = useDataContext();

    const tuneIndex = tuneIds.findIndex(id => id === currentId);

    const handleNext = () => {
        if (tuneIndex >= 0 && tuneIndex <= tuneIds.length) {
            const nextId = tuneIds[tuneIndex + 1];
            if (nextId) {
                navigate(`/tunes/${nextId}`);
            }
        }
    }

    return (
        <Button
            px={"xs"}
            title={t("button.next")}
            size={"sm"}
            color={"red"}
            variant={"subtle"}
            disabled={tuneIndex < 0 || currentId === tuneIds[tuneIds.length - 1]}
            onClick={handleNext}
        >
            <GrFormNextLink size={Size.icon.LG}/>
        </Button>
    );
}

export default NextTuneButton;
