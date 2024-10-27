import React, {useEffect, useState} from "react";
import {DataFilteringContextProvider} from "../../hooks/useDataFiltering.tsx";
import {Recording} from "../../model/Recording.ts";
import {useDataService} from "../../hooks/useDataService.tsx";
import {DisplayError} from "../../utils/common.helpers.tsx";
import {useTranslation} from "react-i18next";
import {ModificationsContextProvider} from "../../hooks/useModifications.tsx";
import {useLocation} from "react-router-dom";
import {Filter} from "../../context/DataFilteringContext.tsx";
import RecordingListContent from "./RecordingListContent.tsx";

const RecordingList: React.FC = () => {

    const {t} = useTranslation();

    const [data, setData] = useState<Recording[]>([]);
    const [filters, setFilters] = useState<Filter[]>([]);
    // const {fetchStats} = useStatsService();

    const {fetchData, cancelSource} = useDataService();
    const location = useLocation();

    useEffect(() => {
        fetchData()
            .then(setData)
            .catch(e => DisplayError(e, t("toast.error.fetchData")));

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
        <ModificationsContextProvider>
            <DataFilteringContextProvider data={data} filters={filters}>
                <RecordingListContent/>
            </DataFilteringContextProvider>
        </ModificationsContextProvider>
    );
}

export default RecordingList;
