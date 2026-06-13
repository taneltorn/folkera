import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useNavigate} from "react-router-dom";
import {GrFormPreviousLink} from "react-icons/gr";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    currentId: string;
}

const PreviousTuneButton: React.FC<Properties> = ({currentId}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {tuneIds} = useDataContext();

    const tuneIndex = tuneIds.findIndex(id => id === currentId);

    const handlePrevious = () => {
        if (tuneIndex > 0) {
            const previousId = tuneIds[tuneIndex - 1];
            if (previousId) {
                navigate(`/tunes/${previousId}`);
            }
        }
    }

    return (
        <Button
            px={"xs"}
            title={t("button.previous")}
            radius={"xl"}
            size={"sm"}
            color={"gray"}
            variant={"subtle"}
            disabled={tuneIndex < 0 || currentId === tuneIds[0]}
            onClick={handlePrevious}
        >
            <GrFormPreviousLink size={Size.icon.LG}/>
        </Button>
    );
}

export default PreviousTuneButton;
