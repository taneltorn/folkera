import React, {useEffect, useState} from "react";
import {useStatsService} from "../hooks/useStatsService.tsx";
import MapTemplate from "../components/MapTemplate.tsx";
import {useDataService} from "../hooks/useDataService.tsx";
import {Recording} from "../model/Recording.ts";
import {useNavigate} from "react-router-dom";
import {Group, Slider, Switch} from "@mantine/core";
import {DefaultMapOptions} from "../utils/map.helpers.ts";
import {MapOptions} from "../model/MapOptions.ts";
import {isEmpty} from "../utils/common.helpers.tsx";

const Parishes: React.FC = () => {

    const [data, setData] = useState<Recording[]>([]);
    const {fetchData} = useDataService();
    const {fetchStats} = useStatsService();

    const [stats, setStats] = useState<Map<string, number>>(new Map());
    const [layers, setLayers] = useState<any>(null);
    const [options, setOptions] = useState<MapOptions>(DefaultMapOptions);

    const navigate = useNavigate();

    const handleClick = (location: string) => {
        navigate(`/`, {
            state: {
                filters: [{
                    field: "location",
                    value: location
                }]
            }
        });
    }

    useEffect(() => {
        fetchData()
            .then(setData);
    }, []);

    useEffect(() => {
        if (isEmpty(data)) {
            return;
        }
        fetchStats(data, {key: "location", transformer: "parish"})
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
        <>
            <Group px={"md"} mb={"md"} style={{zIndex: 22}}>
                <Switch
                    label="Näita statistikat"
                    checked={options.showCounts}
                    onChange={event => setOptions({...options, showCounts: event.currentTarget.checked})}
                />

                <Switch
                    label="As heat map"
                    checked={options.asHeatMap}
                    onChange={event => setOptions({...options, asHeatMap: event.currentTarget.checked})}
                />

                <Slider
                    w={400}
                    value={options.heatIntensity}
                    min={0.1}
                    max={0.9}
                    step={0.1}
                    onChange={v => setOptions({...options, heatIntensity: v})}
                />

                <Slider
                    w={400}
                    value={options.textSize}
                    min={4}
                    max={20}
                    step={2}
                    onChange={v => setOptions({...options, textSize: v})}
                />
            </Group>

            <MapTemplate
                data={stats}
                layers={layers}
                filters={[]}
                options={options}
                onClick={handleClick}
            />
        </>
    );
}

export default Parishes;
