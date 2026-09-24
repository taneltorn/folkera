import React from 'react';
import {Button, Tooltip} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {useDataContext} from "../../hooks/useDataContext.tsx";
import {useTuneService} from "../../hooks/useTuneService.ts";
import {ToastType} from "../../context/ToastContext.tsx";
import {useToasts} from "../../hooks/useToasts.tsx";
import {IoPlaySkipForward} from "react-icons/io5";

const PlayNext: React.FC = () => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {
        track,
        setTrack
    } = useAudioPlayer();

    const {tuneIds} = useDataContext();
    const tuneService = useTuneService();

    const tuneIndex = tuneIds.findIndex(id => id === track?.id);

    const handleClick = () => {
        if (tuneIndex >= 0 && tuneIndex <= tuneIds.length) {
            const nextId = tuneIds[tuneIndex + 1];
            if (nextId) {
                tuneService.fetchTune(nextId)
                    .then(r => setTrack(r))
                    .catch(error => {
                        notify(t("toast.error.fetchData"), ToastType.ERROR, error);
                    })
            }
        }
    };

    return (
        <Tooltip label={t("player.next")}>
            <Button
                size={"compact-md"}
                variant={"transparent"}
                onClick={handleClick}
            >
                <IoPlaySkipForward size={Size.icon.MD}/>
            </Button>
        </Tooltip>
    );
}

export default PlayNext;
