import {useState} from "react";
import {Recording} from "../model/Recording";
import {useTranslation} from "react-i18next";
import {useIdentifyService} from "../services/useIdentifyService";
import {useDataService} from "../services/useDataService";

export const useSimilarRecordings = () => {

    const {t} = useTranslation();
    const identifyService = useIdentifyService();
    const dataService = useDataService();

    const [similarRecordings, setSimilarRecordings] = useState<Recording[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>("");

    const findSimilarRecordings = async (
        filePath: string | undefined,
        top: number = 20,
        skipFirst: boolean = false,
        removeFile: boolean = false
    ) => {
        if (!filePath) {
            return;
        }

        setIsLoading(true);
        setLoadingText(t("view.identify.identifying"));

        try {
            const r = await identifyService.identify(filePath, top, skipFirst);
            const distances = Object.fromEntries(r.data);
            const ids = r.data.map((x: any) => x[0]);

            setLoadingText(t("view.identify.loadingData"));

            const data = await dataService.fetchRecordingsByIds(ids);

            data.forEach((recording: Recording) => {
                recording.distance = distances[recording.id];
            });

            data.sort((a: Recording, b: Recording) => (a.distance || 0) - (b.distance || 0));
            setSimilarRecordings(data);

            setLoadingText("");
            if (removeFile) {
                identifyService.deleteFile(filePath);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        loadingText,
        similarRecordings,
        findSimilarRecordings,
        setSimilarRecordings,
    };
};
