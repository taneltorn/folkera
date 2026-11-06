import {useCallback} from "react";
import {useAudioPlayer} from "./useAudioContext.tsx";
import {useDataContext} from "./useDataContext.tsx";
import {useTuneService} from "./useTuneService.ts";
import {useToasts} from "./useToasts.tsx";
import {ToastType} from "../context/ToastContext.tsx";
import {useTranslation} from "react-i18next";

export const usePlayNext = () => {

    const {t} = useTranslation();
    const {notify} = useToasts();
    const {track, setTrack, setIsPlaying} = useAudioPlayer();
    const {tuneIds} = useDataContext();
    const tuneService = useTuneService();

    const tuneIndex = tuneIds.findIndex(id => id === track?.id);
    const hasNext = tuneIndex >= 0 && tuneIndex < tuneIds.length - 1;

    const playNext = useCallback(async (startPlayback = false) => {
        const index = tuneIds.findIndex(id => id === track?.id);

        if (index < 0 || index >= tuneIds.length - 1) {
            return;
        }

        const nextId = tuneIds[index + 1];

        try {
            const nextTrack = await tuneService.fetchTune(nextId);
            setTrack(nextTrack);

            if (startPlayback) {
                setIsPlaying(true);
            }
        } catch (error) {
            notify(t("toast.error.fetchData"), ToastType.ERROR, error);
        }
    }, [track?.id, tuneIds, tuneService, setTrack, setIsPlaying, notify, t]);

    return {playNext, hasNext};
};