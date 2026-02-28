import React, {useEffect, useState} from "react";
import {Alert, Box, Button, FileButton, Group, Stack, Text} from "@mantine/core";
import {useIdentifyService} from "../../services/useIdentifyService.ts";
import {useTranslation} from "react-i18next";
import AudioPlayer from "react-h5-audio-player";
import SimilarTunesTable from "../tunes/table/components/SimilarTunesTable.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import {Dropzone, FileWithPath} from "@mantine/dropzone";
import {IoIosClose, IoIosCloudUpload} from "react-icons/io";
import {LuAudioLines} from "react-icons/lu";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {Size} from "../../utils/constants.ts";
import {FaInfo} from "react-icons/fa";
import IdentifyLoader from "../tunes/components/IdentifyLoader.tsx";
import {LoadingState} from "../../model/LoadingState.ts";
import Page from "../../Page.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import MenuSelect from "../../components/MenuSelect.tsx";
import {CoverHunterDatasets} from "../../utils/lists.ts";
import IconButton from "../../components/buttons/IconButton.tsx";

const SIMILAR_TUNES_TO_FETCH = 50;
const MAX_SIZE = 10;

const IdentifyView: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const identifyService = useIdentifyService();
    const {findSimilarTunes, setSimilarTunes} = useSimilarTunes();

    const [file, setFile] = useState<File | null>(null);
    const [dataset, setDataset] = useState<string>("folkera");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const handleFileChange = (file: File | null) => {
        setFile(file);
        setSimilarTunes([]);
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
        setSimilarTunes([]);
    };

    const handleSubmit = async () => {
        if (!file) return;

        setIsUploading(true);
        identifyService.upload(file)
            .then(file => {
                findSimilarTunes(file, SIMILAR_TUNES_TO_FETCH, "", dataset, true)
            })
            .finally(() => setIsUploading(false));
    };

    useEffect(() => {
        setSimilarTunes([]);
    }, []);

    return (
        <Page title={t("page.identify.title")}>
            <Box px={"md"} pos={"relative"}>
                <Alert
                    mb={"md"}
                    variant="light"
                    color="blue"
                    title={t("page.identify.alert")}
                    icon={<FaInfo size={Size.icon.MD}/>}
                />

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
                                        {t("page.identify.fileUploadPlaceholder")}
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        {t("page.identify.maxFileSize", {size: MAX_SIZE})}
                                    </Text>
                                </div>}
                        </Group>
                    </Dropzone>

                    <Group justify={"center"} flex={1}>
                        {file && audioUrl
                            ? <Group w={{base: 340, sm: 600}} wrap={"nowrap"}>
                                <AudioPlayer
                                    className={"transparent"}
                                    layout={"horizontal-reverse"}
                                    showJumpControls={false}
                                    customVolumeControls={[]}
                                    customAdditionalControls={[]}
                                    src={audioUrl}
                                />
                                <IconButton type={"clear"} onClick={handleFileClear}/>
                            </Group>
                            : <FileButton accept="audio/*" onChange={handleFileChange}>
                                {(props) =>
                                    <Button
                                        {...props}
                                        variant={"outline"}
                                        leftSection={<LuAudioLines size={Size.icon.SM}/>}
                                    >
                                        {t("button.selectFile")}
                                    </Button>}
                            </FileButton>}
                    </Group>

                    {file &&
                        <Group justify={"center"} mb={"xl"}>
                            <Button
                                leftSection={<FaMagnifyingGlass/>}
                                onClick={handleSubmit}
                            >
                                {t("page.identify.submit")}
                            </Button>

                            {currentUser?.isAdmin &&
                                <MenuSelect
                                    value={t(`page.identify.dataset.${dataset}`, {defaultValue: dataset})}
                                    variant={"light"}
                                    options={CoverHunterDatasets.map(it => (
                                        {
                                            value: it,
                                            label: t(`page.identify.dataset.${it}`, {defaultValue: it})
                                        })
                                    )}
                                    label={""}
                                    onChange={setDataset}
                                />
                            }
                        </Group>}
                </Stack>

                <SimilarTunesTable/>
                <IdentifyLoader externalLoadingState={isUploading ? LoadingState.UPLOADING_FILE : undefined}/>
            </Box>
        </Page>
    );
};

export default IdentifyView;
