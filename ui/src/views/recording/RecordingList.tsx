import React, {useEffect, useState} from "react";
import {DataFilteringContextProvider} from "../../hooks/useDataFiltering.tsx";
import {useDataService} from "../../hooks/useDataService.tsx";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {Filter} from "../../context/DataFilteringContext.tsx";
import {Recording} from "../../../../domain/Recording.ts";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {Box} from "@mantine/core";
import RecordingTopControls from "./controls/RecordingTopControls.tsx";
import RecordingBottomControls from "./controls/RecordingBottomControls.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import RecordingTable from "./table/RecordingTable.tsx";
import RecordingMap from "./map/RecordingMap.tsx";
import RecordingStats from "./stats/RecordingStats.tsx";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";

const RecordingList: React.FC = () => {

    const {t} = useTranslation();

    const [data, setData] = useState<Recording[]>([]);
    const [filters, setFilters] = useState<Filter[]>([]);
    const {activeView} = useActiveView();
    const {notify} = useNotifications();

    const {fetchData, cancelSource} = useDataService();
    const location = useLocation();

    useEffect(() => {
        fetchData()
            .then(setData)
            .catch(e => notify(t("toast.error.fetchData"), NotificationType.ERROR, e));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    useEffect(() => {
        if (location.state?.filters) {
            setFilters(location.state.filters)
        }
    }, [location.state]);

    return (
        <DataFilteringContextProvider data={data} filters={filters}>
            <Box mb={75}>
                <RecordingTopControls/>
                <RecordingBottomControls/>

                {activeView === View.TABLE && <RecordingTable/>}
                {activeView === View.MAP && <RecordingMap/>}
                {activeView === View.STATS && <RecordingStats/>}
            </Box>

        </DataFilteringContextProvider>
    );
}

export default RecordingList;
