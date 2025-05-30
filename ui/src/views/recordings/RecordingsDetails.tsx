import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Box, Button, Center, Group, Title} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import {useDataService} from "../../services/useDataService.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import SimilarRecordingsTable from "./table/components/SimilarRecordingsTable.tsx";
import FilterButtons from "./table/components/controls/FilterButtons.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import RecordingsInfo from "./RecordingsInfo.tsx";
import RecordingHeader from "./RecordingsHeader.tsx";
import {FaPython} from "react-icons/fa";
import {Size} from "../../utils/constants.ts";

const LOAD_MORE_STEP = 15;

const RecordingsList: React.FC = () => {

    const {t} = useTranslation();
    const {id} = useParams();
    const {notify} = useNotifications();
    const dataService = useDataService();
    const {
        similarRecordings,
        isLoading,
        loadingText,
        findSimilarRecordings,
        setSimilarRecordings
    } = useSimilarRecordings();

    const [top, setTop] = useState<number>(0);
    const [recording, setRecording] = useState<Recording>();

    const fetchData = (id: string | undefined) => {
        if (!id) {
            return;
        }

        dataService.fetchRecording(id)
            .then(data => {
                setRecording(data);
            })
            .catch(error => {
                notify(t("toast.error.fetchData"), NotificationType.ERROR, error);
            });
    }

    const handleLoadMore = (top: number) => {
        if (recording?.file) {
            setTop(top);
            findSimilarRecordings(recording?.file, top, true);
        }
    }

    useEffect(() => {
        setSimilarRecordings([]);
        fetchData(id);
    }, [id]);


    return (
        <Page title={t("page.title.recordings")}>
            {recording && <>
                <Box px={"md"} mb={"md"}>
                    <RecordingHeader
                        recording={recording}
                        reloadData={() => fetchData(id)}
                    />

                    {recording.tune &&
                        <Group mb={"xs"}>
                            <FilterButtons
                                recording={recording}
                                field={"tune"}
                                returnHome
                                replace
                            />
                        </Group>}

                    <RecordingsInfo recording={recording}/>

                    {similarRecordings.length === 0 && !isLoading &&
                        <Button
                            mt={"lg"}
                            loading={isLoading}
                            variant={"filled"}
                            leftSection={<FaPython size={Size.icon.MD}/>}
                            onClick={() => handleLoadMore(LOAD_MORE_STEP)}
                        >
                            {t("view.recordings.details.similarRecordings")}
                        </Button>}
                    <Title order={3} mt={"xl"}>
                    </Title>
                </Box>

                <SimilarRecordingsTable
                    recordings={similarRecordings}
                    isLoading={isLoading}
                    loadingText={loadingText}
                />

                {!isLoading && similarRecordings.length > 0 &&
                    <Center mt={"md"}>
                        <Button
                            variant={"subtle"}
                            onClick={() => handleLoadMore(top + LOAD_MORE_STEP)}
                        >
                            {t("page.loadMore")}
                        </Button>
                    </Center>}
            </>}
        </Page>
    );
}

export default RecordingsList;
