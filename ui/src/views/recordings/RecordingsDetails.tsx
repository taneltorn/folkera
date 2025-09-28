import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Box, Button, Group} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import {useDataService} from "../../services/useDataService.ts";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import SimilarRecordingsTable from "./table/components/SimilarRecordingsTable.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import RecordingsInfoTable from "./RecordingsInfoTable.tsx";
import RecordingHeader from "./RecordingsHeader.tsx";
import {Size} from "../../utils/constants.ts";
import Loading from "../../components/Loading.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import SelectionControls from "./components/controls/SelectionControls.tsx";
import {GiMagnifyingGlass} from "react-icons/gi";

const SIMILAR_RECORDINGS_TO_FETCH = 100;

const RecordingsList: React.FC = () => {

    const {t} = useTranslation();
    const {id} = useParams();
    const {notify} = useNotifications();
    const {currentUser} = useAuth();
    const dataService = useDataService();
    const {
        similarRecordings,
        isLoading,
        loadingText,
        findSimilarRecordings,
        setSimilarRecordings
    } = useSimilarRecordings();

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

    const fetchSimilarRecordings = () => {
        if (recording?.file) {
            findSimilarRecordings(recording?.file, SIMILAR_RECORDINGS_TO_FETCH, recording.id);
        }
    }

    useEffect(() => {
        setSimilarRecordings([]);
        fetchData(id);

        return () => dataService.cancelSource.cancel();
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

                    {currentUser?.isUser && <>
                        <Group gap={4} my={"md"}>
                            {similarRecordings.length === 0 &&
                                <Button
                                    variant={"filled"}
                                    leftSection={<GiMagnifyingGlass size={Size.icon.SM}/>}
                                    onClick={fetchSimilarRecordings}
                                >
                                    {t("view.recordings.details.similarRecordings")}
                                </Button>}

                            {similarRecordings.length > 0 && currentUser?.isAdmin && <SelectionControls/>}
                        </Group>

                        <Loading
                            isLoading={isLoading}
                            text={loadingText}
                        />
                    </>}
                </Box>

                <SimilarRecordingsTable recordings={similarRecordings}/>

            </>}
        </Page>
    );
}

export default RecordingsList;
