import React, {useEffect, useState} from "react";
import {useStatsService} from "../../../hooks/useStatsService.tsx";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import MapTemplate from "../../../components/MapTemplate.tsx";
import {MapStats} from "../../../model/Stats.ts";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import {Box} from "@mantine/core";
import {useMapOptions} from "../../../hooks/useMapOptions.tsx";
import {MapType} from "../../../model/MapOptions.ts";
import {CountyToParishMap} from "../../../utils/location.mappings.ts";
import {useNotifications} from "../../../hooks/useNotifications.tsx";
import {useTranslation} from "react-i18next";
import {NotificationType} from "../../../context/NotificationContext.tsx";

interface Properties {
}

const RecordingMap: React.FC<Properties> = () => {

    const {t} = useTranslation();
    const {addFilter} = useDataFiltering();
    const {setActiveView} = useActiveView();
    const {fetchMapStats} = useStatsService();
    const {filteredData} = useDataFiltering();
    const {notify} = useNotifications();

    const [stats, setStats] = useState<MapStats>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [parishLayers, setParishLayers] = useState<any>(null);
    const [countyLayers, setCountyLayers] = useState<any>(null);

    const {options} = useMapOptions();

    const handleClick = (location: string) => {
        setActiveView(View.TABLE);
        addFilter("location", options.type === MapType.COUNTIES ? CountyToParishMap.get(location) || [] : [location]);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchMapStats(filteredData)
            .then(r => setStats(r))
            .catch(e => notify(t("toast.error.fetchStats"), NotificationType.ERROR, e))
    }, [filteredData]);

    useEffect(() => {
        Promise.all([
            fetch(`/maps/${MapType.PARISHES}.json`).then(response => response.json()),
            fetch(`/maps/${MapType.COUNTIES}.json`).then(response => response.json())
        ])
            .then(([parishData, countyData]) => {
                setParishLayers(parishData);
                setCountyLayers(countyData);
            })
            .finally(() => setIsLoading(false));
    }, [stats]);

    return (
        <Box px={"md"} h={700}>
            {stats &&
                <MapTemplate
                    isLoading={isLoading}
                    stats={options.type === MapType.COUNTIES ? stats.counties : stats.parishes}
                    layers={options.type === MapType.COUNTIES ? countyLayers : parishLayers}
                    options={options}
                    onClick={handleClick}
                />}
        </Box>
    );
}

export default RecordingMap;
