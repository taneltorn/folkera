import React, {useEffect, useState} from "react";
import {Box, Group, LoadingOverlay, Select} from "@mantine/core";
import {useAudioPlayer} from "../hooks/useAudioContext.tsx";
import {useDataService} from "../hooks/useDataService.tsx";
import {Recording} from "../../../domain/Recording.ts";
import {useTranslation} from "react-i18next";

import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import {useNotifications} from "../hooks/useNotifications.tsx";
import {NotificationType} from "../context/NotificationContext.tsx";
import chroma from "chroma-js";

const clusterMaps = [
    {
        name: "Folk150",
        "file": "cluster-maps/folk150.json"
    },
    {
        name: "Folk150_TESTSET",
        "file": "cluster-maps/folk150_testset.json"
    },
    {
        name: "Folk",
        "file": "cluster-maps/all.json"
    }
];

const markerSymbols = [
    "circle", "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left", "triangle-right",
    "star", "hexagram", "pentagram", "hourglass", "bowtie",
];

interface ClusterData {
    x: number[];
    y: number[];
    label: string[];
    work_list: string[];
    perf_list: string[];
    label_list: string[];
}

const ClusterPlot: React.FC = () => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchData, cancelSource} = useDataService();
    const {notify} = useNotifications();

    const [data, setData] = useState<Plotly.Data[]>();
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const convertToPlotlyData = (data: ClusterData): Plotly.Data[] => {
        const groupedData: { [key: string]: any } = {};
        const numberOfColors = (new Set(data.work_list)).size;
        let colors = chroma.scale("GnBu").colors(numberOfColors);

        colors = chroma.scale(['#999', 'black']).colors(numberOfColors);

        data.work_list.forEach((work, i) => {
            if (!groupedData[work]) {
                groupedData[work] = {
                    x: [],
                    y: [],
                    mode: "markers",
                    type: "scatter",
                    name: work,
                    marker: {
                        size: 10,
                        color: colors[i % colors.length],
                        symbol: markerSymbols[i % markerSymbols.length],
                    },
                    text: [],
                };
            }

            groupedData[work].x.push(data.x[i]);
            groupedData[work].y.push(data.y[i]);
            groupedData[work].text.push(data.label_list[i]);
        });

        colors = chroma.scale("YlGnBu").colors(numberOfColors);

        const array = Object.values(groupedData);

        array.push({
            x: [data.x[0]],
            y: [data.y[0]],
            mode: "markers",
            type: "scatter",
            name: "All",
            marker: {
                size: 266,
                color: colors[100],
                symbol: "star",
            },
            text: data.label_list,
        })


        return array
    }

    useEffect(() => {
        fetchData()
            .then(setRecordings)
            .catch(e => notify(t("toast.error.fetchData"), NotificationType.ERROR, e));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    const fetchClusterData = (file: string) => {
        fetch(`/${file}`)
            .then((response) => response.json())
            .then((json: ClusterData) => {
                const data = convertToPlotlyData(json);
                // @ts-ignore
                data.sort((a, b) => a.name.localeCompare(b.name));
                setData(data);
            })
            .catch((error) => console.error("Error loading cluster data:", error))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        setIsLoading(true);
        fetchClusterData("folk150.json");
    }, []);

    const handleClick = (event: any) => {
        if (event.points.length > 0) {
            const file = event.points[0].text.split("|")[4]?.trim();
            const recording = recordings.find(r => r.file === file);
            if (recording) {
                isPlaying && recording === track ? pause() : play(recording)
            }
        }
    };

    return (
        <Box px={"md"}>
            <Group>
                <Select
                    data={clusterMaps.map(c => c.name)} 
                    defaultValue={clusterMaps[0].name}
                    onChange={(value) => {
                        const file = clusterMaps.find(c => c.name === value)?.file;
                        if (file) {
                            fetchClusterData(file);
                        }
                    }}
                />
            </Group>
            <Plot
                data={data || []}
                onClick={handleClick}
                layout={{
                    title: "Interactive t-SNE Cluster Plot",
                    showlegend: true,
                    dragmode: "zoom",
                    autosize: true,
                    xaxis: {
                        visible: false,
                        uirevision: 'time',
                    },
                    yaxis: {
                        visible: false,
                        uirevision: 'time',

                    }
                }}
                style={{width: "100%", height: "800px"}}
            />

            <LoadingOverlay visible={isLoading}/>
        </Box>
    );
};

export default ClusterPlot;
