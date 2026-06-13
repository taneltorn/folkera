import React from 'react';
import {Button} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useDataContext} from "../../hooks/useDataContext.tsx";
import {useTuneService} from "../../services/useTuneService.ts";
import {ToastType} from "../../context/ToastContext.tsx";
import {useToasts} from "../../hooks/useToasts.tsx";
import {IoPlaySkipBackSharp} from "react-icons/io5";

const PlayPrevious: React.FC = () => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {
        track,
        setTrack,
        reset
    } = useAudioPlayer();

    const {tuneIds} = useDataContext();
    const tuneService = useTuneService();

    const tuneIndex = tuneIds.findIndex(id => id === track?.id);

    const handleClick = () => {
        if (tuneIndex >= 0 && tuneIndex <= tuneIds.length) {
            const previousId = tuneIds[tuneIndex - 1];
            if (previousId) {
                tuneService.fetchTune(previousId)
                    .then(r => setTrack(r))
                    .catch(error => {
                        notify(t("toast.error.fetchData"), ToastType.ERROR, error);
                    })
            } else {
                reset();
            }
        }
    };

    return (
        <Button
            title={t(`player.previous`)}
            size={"compact-md"}
            variant={"transparent"}
            onClick={handleClick}
        >
            <IoPlaySkipBackSharp size={Size.icon.MD}/>
        </Button>
    );
}

export default PlayPrevious;
