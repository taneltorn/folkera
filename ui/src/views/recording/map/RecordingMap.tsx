import React, {useEffect, useState} from "react";
import {useStatsService} from "../../../hooks/useStatsService.tsx";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import MapTemplate from "../../../components/MapTemplate.tsx";
import {DefaultMapOptions} from "../../../utils/map.helpers.ts";
import {isEmpty} from "../../../utils/common.helpers.tsx";
import {Recording} from "../../../model/Recording.ts";

interface Properties {
    data: Recording[]
}

const RecordingMap: React.FC<Properties> = ({data}) => {

    const {filters, toggleView, addFilter} = useDataFiltering();
    const {fetchStats} = useStatsService();

    const [stats, setStats] = useState<Map<string, number>>(new Map());
    const [layers, setLayers] = useState<any>(null);

    const handleClick = (location: string) => {
        toggleView();
        addFilter("location", [location])
    }

    useEffect(() => {
        fetchStats(data, {key: "location", transformer: "location"})
            .then(data => setStats(data as Map<string, number>));
    }, [data]);

    useEffect(() => {
        if (isEmpty(stats)) {
            return;
        }
        fetch(`/maps/kihelkonnad.json`)
            .then((response) => response.json())
            .then((data) => setLayers(data));
    }, [stats]);


    return (
        <MapTemplate
            data={stats}
            layers={layers}
            filters={filters}
            options={DefaultMapOptions}
            onClick={handleClick}
        />
    );
}

export default RecordingMap;
