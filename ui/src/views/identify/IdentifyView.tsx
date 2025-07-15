import React, {useState} from "react";
import {Box, Button, Group} from "@mantine/core";
import {useIdentifyService} from "../../services/useIdentifyService.ts";
import {useTranslation} from "react-i18next";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import AudioPlayer from "react-h5-audio-player";
import SimilarRecordingsTable from "../recordings/table/components/SimilarRecordingsTable.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import RecordingUpload from "./components/RecordingUpload.tsx";
import LoadMoreButton from "../../components/buttons/LoadMoreButton.tsx";

const LOAD_MORE_STEP = 10;

const IdentifyView: React.FC = () => {

    const {t} = useTranslation();
    const {notify} = useNotifications();
    const identifyService = useIdentifyService();

    const [file, setFile] = useState<File | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [top, setTop] = useState<number>(LOAD_MORE_STEP);

    const {
        similarRecordings,
        isLoading,
        loadingText,
        findSimilarRecordings,
        setSimilarRecordings
    } = useSimilarRecordings();

    const handleFileChange = (file: File | null) => {
        setFile(file);
        setSimilarRecordings([]);
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        } else {
            setAudioUrl(null);
        }
    };

    const handleFileClear = async () => {
        setFile(null);
        setSimilarRecordings([]);
    };

    const handleSubmit = async (top: number) => {
        if (!file) return;

        setTop(top);
        identifyService.upload(file)
            .then(file => {
                findSimilarRecordings(file, top, true, true)
            })
            .catch(e => {
                notify(t("toast.error.test"), NotificationType.ERROR, e);
            });
    };

    return (
        <>
            <Box px={"md"} mb={"xl"}>
                <RecordingUpload file={file} onChange={handleFileChange} onClear={handleFileClear}/>

                {file && <>
                    {audioUrl &&
                        <Box my={"md"} maw={600}>
                            <AudioPlayer
                                className={"transparent"}
                                layout={"horizontal-reverse"}
                                showJumpControls={false}
                                customVolumeControls={[]}
                                customAdditionalControls={[]}
                                src={audioUrl}
                            />
                        </Box>}

                    {!similarRecordings.length &&
                        <Group mt={"md"} mb={"md"} gap={4}>
                            <Button
                                onClick={() => handleSubmit(top)}
                                disabled={!file || isLoading}
                                loading={identifyService.isLoading}
                            >
                                {t("view.identify.submit")}
                            </Button>
                        </Group>}
                </>}
            </Box>

            <SimilarRecordingsTable
                recordings={similarRecordings}
                isLoading={isLoading}
                loadingText={loadingText}
            />

            <LoadMoreButton
                visible={!isLoading && similarRecordings.length > 0}
                onClick={() => handleSubmit(top + LOAD_MORE_STEP)}
            />
        </>
    );
};

export default IdentifyView;
