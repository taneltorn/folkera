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

const LOAD_MORE_STEP = 20;

const RecordingsList: React.FC = () => {

    const {t} = useTranslation();

    const dataService = useDataService();
    const {notify} = useNotifications();
    const {id} = useParams();
    const {similarRecordings, isLoading, loadingText, findSimilarRecordings} = useSimilarRecordings();

    const [top, setTop] = useState<number>(LOAD_MORE_STEP);
    const [recording, setRecording] = useState<Recording>();

    useEffect(() => {
        findSimilarRecordings(recording?.file, top, true);
    }, [top, recording]);

    useEffect(() => {
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
    }, [id]);

    return (
        <Page title={t("page.title.recordings")}>
            {recording && <>
                <Box px={"md"} mb={"md"}>
                    <RecordingHeader recording={recording}/>

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

                    <Title order={3} mt={"xl"}>Sarnased lood</Title>
                </Box>

                <SimilarRecordingsTable
                    recordings={similarRecordings}
                    isLoading={isLoading}
                    loadingText={loadingText}
                />

                {!isLoading &&
                    <Center mt={"md"}>
                        <Button variant={"subtle"} onClick={() => setTop(top + LOAD_MORE_STEP)}>
                            {t("page.loadMore")}
                        </Button>
                    </Center>}
            </>}
        </Page>
    );
}

export default RecordingsList;
