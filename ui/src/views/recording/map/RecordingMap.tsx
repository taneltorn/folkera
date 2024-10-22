import React, {useEffect, useState} from "react";
import {useStatsService} from "../../../hooks/useStatsService.tsx";
import {useDataFiltering} from "../../../hooks/useDataFiltering.tsx";
import MapTemplate from "../../../components/MapTemplate.tsx";
import {MapStats} from "../../../model/Stats.ts";
import {useActiveView} from "../../../hooks/useActiveView.tsx";
import {View} from "../../../context/ActiveViewContext.tsx";
import RecordingTableFiltersBar from "../controls/RecordingTableFiltersBar.tsx";
import {Box} from "@mantine/core";
import {useMapOptions} from "../../../hooks/useMapOptions.tsx";
import {MapType} from "../../../model/MapOptions.ts";
import {DisplayError} from "../../../utils/common.helpers.tsx";
import {CountyToParishMap} from "../../../utils/location.mappings.ts";

interface Properties {
}

const RecordingMap: React.FC<Properties> = () => {

    const {addFilter} = useDataFiltering();
    const {setActiveView} = useActiveView();
    const {fetchMapStats} = useStatsService();
    const {filteredData} = useDataFiltering();

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
            .catch(e => DisplayError(e, "Failed to get stats"))
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
        <Box px={"md"}>
            <RecordingTableFiltersBar/>

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
