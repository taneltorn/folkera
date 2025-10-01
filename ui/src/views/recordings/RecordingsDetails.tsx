import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Box} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import {useDataService} from "../../services/useDataService.ts";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import SimilarRecordingsTable from "./table/components/SimilarRecordingsTable.tsx";
import RecordingsInfoTable from "./details/components/RecordingsInfoTable.tsx";
import RecordingHeader from "./RecordingsHeader.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import {useModifications} from "../../hooks/useModifications.tsx";
import {useRecordingSelection} from "../../hooks/useRecordingSelection.tsx";
import {useControlState} from "../../hooks/useControlState.tsx";
import {ControlState} from "../../model/ControlState.ts";
import IdentifyLoader from "./components/IdentifyLoader.tsx";

const RecordingsList: React.FC = () => {

    const {t} = useTranslation();
    const {id} = useParams();
    const {notify} = useNotifications();
    const dataService = useDataService();
    const {setSimilarRecordings} = useSimilarRecordings();
    const {clearSelection} = useRecordingSelection();
    const {clearModifications} = useModifications();
    const {setState} = useControlState();

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

    useEffect(() => {
        clearModifications();
        clearSelection();
        setSimilarRecordings([]);
        setState(ControlState.IDLE);

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
                </Box>

                <SimilarRecordingsTable/>
                <IdentifyLoader/>
            </>}
        </Page>
    );
}

export default RecordingsList;
