import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Box, Button} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import {useDataService} from "../../services/useDataService.ts";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import SimilarRecordingsTable from "./table/components/SimilarRecordingsTable.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import RecordingsInfoTable from "./RecordingsInfoTable.tsx";
import RecordingHeader from "./RecordingsHeader.tsx";
import LoadMoreButton from "../../components/buttons/LoadMoreButton.tsx";
import {TbZoomQuestion} from "react-icons/tb";
import {Size} from "../../utils/constants.ts";

const LOAD_MORE_STEP = 25;

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

    const fetchSimilarRecordings = (top: number) => {
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

                    <RecordingsInfoTable recording={recording}/>

                    {similarRecordings.length === 0 && !isLoading &&
                        <Button
                            mt={"lg"}
                            loading={isLoading}
                            variant={"filled"}
                            leftSection={<TbZoomQuestion size={Size.icon.MD}/>}
                            onClick={() => fetchSimilarRecordings(LOAD_MORE_STEP)}
                        >
                            {t("view.recordings.details.similarRecordings")}
                        </Button>}
                </Box>

                <SimilarRecordingsTable
                    recordings={similarRecordings}
                    isLoading={isLoading}
                    loadingText={loadingText}
                />

                <LoadMoreButton
                    visible={!isLoading && similarRecordings.length > 0}
                    onClick={() => fetchSimilarRecordings(top + LOAD_MORE_STEP)}
                />
            </>}
        </Page>
    );
}

export default RecordingsList;
