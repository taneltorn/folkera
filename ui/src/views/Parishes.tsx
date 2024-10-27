import React, {useEffect, useState} from "react";
import {useStatsService} from "../hooks/useStatsService.tsx";
import MapTemplate from "../components/MapTemplate.tsx";
import {useDataService} from "../hooks/useDataService.tsx";
import {Recording} from "../model/Recording.ts";
import {useNavigate} from "react-router-dom";
import {Box, Group, Slider, Switch, Text} from "@mantine/core";
import {DefaultMapOptions} from "../utils/map.helpers.ts";
import {MapOptions} from "../model/MapOptions.ts";
import {isEmpty} from "../utils/common.helpers.tsx";
import {StatsItem} from "../model/Stats.ts";

const Parishes: React.FC = () => {

    // const [data, setData] = useState<Recording[]>([]);
    // const {fetchData} = useDataService();
    // const {fetchStats} = useStatsService();
    //
    // const [stats, setStats] = useState<StatsItem[]>([]);
    // const [layers, setLayers] = useState<any>(null);
    // const [options, setOptions] = useState<MapOptions>(DefaultMapOptions);
    //
    // const navigate = useNavigate();
    //
    // const handleClick = (location: string) => {
    //     navigate(`/`, {
    //         state: {
    //             filters: [{
    //                 field: "location",
    //                 value: location
    //             }]
    //         }
    //     });
    // }
    //
    // useEffect(() => {
    //     fetchData()
    //         .then(setData);
    // }, []);
    //
    // useEffect(() => {
    //     if (isEmpty(data)) {
    //         return;
    //     }
    //     fetchStats(data, {groupBy: "location", dataTransformer: "SplitByComma,CutFromLessThanSign,ParishToCounty"})
    //         .then(r => setStats(r));
    //
    // }, [data]);
    //
    // useEffect(() => {
    //     if (isEmpty(stats)) {
    //         return;
    //     }
    //     fetch(`/maps/kihelkonnad.json`)
    //         .then((response) => response.json())
    //         .then((data) => setLayers(data));
    // }, [stats]);


    return (
        <Box px={"md"}>
            <Text>TODO</Text>
            {/*<Group px={"md"} mb={"md"} style={{zIndex: 22}}>*/}
            {/*    <Switch*/}
            {/*        label="Näita statistikat"*/}
            {/*        checked={options.showCounts}*/}
            {/*        onChange={event => setOptions({...options, showCounts: event.currentTarget.checked})}*/}
            {/*    />*/}

            {/*    <Switch*/}
            {/*        label="As heat map"*/}
            {/*        checked={options.asHeatMap}*/}
            {/*        onChange={event => setOptions({...options, asHeatMap: event.currentTarget.checked})}*/}
            {/*    />*/}

            {/*    <Slider*/}
            {/*        w={400}*/}
            {/*        value={options.heatIntensity}*/}
            {/*        min={0.1}*/}
            {/*        max={0.9}*/}
            {/*        step={0.1}*/}
            {/*        onChange={v => setOptions({...options, heatIntensity: v})}*/}
            {/*    />*/}

            {/*    <Slider*/}
            {/*        w={400}*/}
            {/*        value={options.textSize}*/}
            {/*        min={4}*/}
            {/*        max={20}*/}
            {/*        step={2}*/}
            {/*        onChange={v => setOptions({...options, textSize: v})}*/}
            {/*    />*/}
            {/*</Group>*/}

            {/*<MapTemplate*/}
            {/*    stats={stats}*/}
            {/*    layers={layers}*/}
            {/*    filters={[]}*/}
            {/*    options={options}*/}
            {/*    onClick={handleClick}*/}
            {/*/>*/}
        </Box>
    );
}

export default Parishes;
