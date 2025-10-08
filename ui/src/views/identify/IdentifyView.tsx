import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Combobox, FileButton, Group, Stack, Text} from "@mantine/core";
import {useIdentifyService} from "../../services/useIdentifyService.ts";
import {useTranslation} from "react-i18next";
import AudioPlayer from "react-h5-audio-player";
import SimilarRecordingsTable from "../recordings/table/components/SimilarRecordingsTable.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import {Dropzone, FileWithPath} from "@mantine/dropzone";
import {IoIosClose, IoIosCloudUpload} from "react-icons/io";
import {LuAudioLines} from "react-icons/lu";
import ClearButton = Combobox.ClearButton;
import {FaMagnifyingGlass} from "react-icons/fa6";
import {Size} from "../../utils/constants.ts";
import {FaInfo} from "react-icons/fa";
import IdentifyLoader from "../recordings/components/IdentifyLoader.tsx";
import {LoadingState} from "../../model/LoadingState.ts";

const SIMILAR_RECORDINGS_TO_FETCH = 50;
const MAX_SIZE = 10;

const IdentifyView: React.FC = () => {

    const {t} = useTranslation();
    const identifyService = useIdentifyService();

    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const {
        findSimilarRecordings,
        setSimilarRecordings,
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

    const handleDrop = (files: FileWithPath[]) => {
        if (files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const handleFileClear = async () => {
        setFile(null);
        setSimilarRecordings([]);
    };

    const handleSubmit = async () => {
        if (!file) return;

        setIsUploading(true);
        identifyService.upload(file)
            .then(file => {
                findSimilarRecordings(file, SIMILAR_RECORDINGS_TO_FETCH, "", true)
            })
            .finally(() => setIsUploading(false));
    };
    
    useEffect(() => {
        setSimilarRecordings([]);
    }, []);

    return (
        <Box px={"md"} flex={{base: 1, sm: 0}}>
            <Alert
                mb={"md"}
                variant="light"
                color="blue"
                title={t("view.identify.alertTitle")}
                icon={<FaInfo size={Size.icon.MD}/>}>

            </Alert>
            <Stack justify={"center"}>
                <Dropzone
                    onDrop={handleDrop}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={MAX_SIZE * 1024 ** 2}
                    accept={['audio/*']}
                    multiple={false}
                >
                    <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
                        <Dropzone.Accept>
                            <IoIosCloudUpload size={52} color="var(--mantine-color-blue-6)"/>
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IoIosClose size={52} color="var(--mantine-color-red-6)"/>
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <LuAudioLines size={52} color={"var(--mantine-color-red-9)"}/>
                        </Dropzone.Idle>

                        {file
                            ? <Text size="md">{file.name}</Text>
                            : <div>
                                <Text size="xl" inline>
                                    {t("view.identify.fileUploadPlaceholder")}
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    {t("view.identify.maxFileSize", {size: MAX_SIZE})}
                                </Text>
                            </div>}
                    </Group>
                </Dropzone>
                <Group justify={"center"} flex={1}>
                    {file && audioUrl
                        ? <>
                            <Group gap={"xs"}>
                                <Group w={{base: 340, sm: 600}} justify={"space-between"} align={"center"}
                                       wrap={"nowrap"}>
                                    <AudioPlayer
                                        className={"transparent"}
                                        layout={"horizontal-reverse"}
                                        showJumpControls={false}
                                        customVolumeControls={[]}
                                        customAdditionalControls={[]}
                                        src={audioUrl}

                                    />
                                    <ClearButton size={"xl"} onClear={handleFileClear}/>
                                </Group>
                            </Group>

                        </>
                        : <FileButton accept="audio/*" onChange={handleFileChange}>
                            {(props) =>
                                <Button {...props} variant={"outline"}>
                                    {t("view.identify.placeholder")}
                                </Button>}
                        </FileButton>}
                </Group>

                {file &&
                    <Group justify={"center"} mb={"xl"}>
                        <Button
                            leftSection={<FaMagnifyingGlass/>}
                            onClick={handleSubmit}
                        >
                            {t("view.identify.submit")}
                        </Button>
                    </Group>}
            </Stack>

            <SimilarRecordingsTable/>
            <IdentifyLoader externalLoadingState={isUploading ? LoadingState.UPLOADING_FILE : undefined}/>
        </Box>
    );
};

export default IdentifyView;
