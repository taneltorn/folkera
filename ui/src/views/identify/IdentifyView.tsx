import React, {useState} from "react";
import {
    Box,
    FileInput,
    Button,
    Group, useMantineTheme,
} from "@mantine/core";
import {useIdentifyService} from "../../services/useIdentifyService.tsx";
import {useTranslation} from "react-i18next";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import AudioPlayer from "react-h5-audio-player";
import SimilarRecordingsTable from "../recordings/table/components/SimilarRecordingsTable.tsx";
import MenuSelect from "../../components/MenuSelect.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import {FaCloudUploadAlt} from "react-icons/fa";
import {Size} from "../../utils/constants.ts";

const IdentifyView: React.FC = () => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {notify} = useNotifications();

    const [file, setFile] = useState<File | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [top, setTop] = useState<number>(10);

    const {similarRecordings, isLoading, loadingText, findSimilarRecordings} = useSimilarRecordings();

    const identifyService = useIdentifyService();

    const handleFileChange = (file: File | null) => {
        setFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        } else {
            setAudioUrl(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;

        identifyService.upload(file)
            .then(file => {
                findSimilarRecordings(file, top, true)
            })
            .catch(e => {
                notify(t("toast.error.test"), NotificationType.ERROR, e);
            });
    };

    return (
        <>
            <Box px={"md"} mb={"md"}>
                <FileInput
                    maw={400}
                    size={"md"}
                    placeholder={t("view.identify.placeholder")}
                    value={file}
                    onChange={handleFileChange}
                    accept="audio/*"
                    clearable
                    leftSection={<FaCloudUploadAlt size={Size.icon.MD} color={theme.colors.red[9]}/>}
                    disabled={identifyService.isLoading}
                />
                {audioUrl &&
                    <Box mt={"md"} maw={600}>
                        <AudioPlayer
                            className={"transparent"}
                            layout={"horizontal-reverse"}
                            showJumpControls={false}
                            customVolumeControls={[]}
                            customAdditionalControls={[]}
                            src={audioUrl}
                        />
                    </Box>}

                {file &&
                    <Group mt={"md"} mb={"md"} gap={4}>
                        <Button
                            onClick={handleSubmit}
                            disabled={!file || isLoading}
                            loading={identifyService.isLoading}
                        >
                            {t("view.identify.submit")}
                        </Button>
                        <MenuSelect
                            label={`${top}`}
                            variant={"outline"}
                            options={[10, 20, 50].map(n => ({label: `${n}`, value: n}))}
                            onChange={v => setTop(+v)}
                        />
                    </Group>}
            </Box>

            <SimilarRecordingsTable
                recordings={similarRecordings}
                isLoading={isLoading}
                loadingText={loadingText}
            />
        </>
    );
};

export default IdentifyView;
