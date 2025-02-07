import React, {useEffect, useState} from "react";
import {Box, Divider, Group, LoadingOverlay, Select, Text} from "@mantine/core";
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
        name: "v0",
        file: "cluster-data/pretrained-folk150_testset.json",
        mAP: 0.753,
        rank1: 3.24
    } ,
    {
        name: "v1",
        file: "cluster-data/v1.json",
        mAP: 0.753,
        rank1: 3.24
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

        const numberOfColors = Math.ceil((new Set(data.work_list.filter(w => !!w))).size );

        const colors = chroma.scale("Set1").colors(numberOfColors);
        // const colors = chroma.scale("YlGnBu").colors(numberOfColors);
        // const colors = chroma.scale(['#999', 'black']).colors(numberOfColors);

        data.work_list.forEach((work, i) => {
            if (!groupedData[work]) {
                groupedData[work] = {
                    x: [],
                    y: [],
                    mode: "markers",
                    type: "scatter",
                    name: work,
                    marker: {
                        size: work ? 10 : 6,
                        color: work
                            ? colors[i % colors.length]
                            : "red",
                        symbol: work ? markerSymbols[i % markerSymbols.length] : "circle",
                    },
                    text: [],
                };
            }

            groupedData[work].x.push(data.x[i]);
            groupedData[work].y.push(data.y[i]);
            groupedData[work].text.push(data.label_list[i]);
        });

        return Object.values(groupedData);
    }


    const fetchClusterData = (file: string) => {
        fetch(file)
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


    const handleClick = (event: any) => {
        if (event.points.length > 0) {
            const file = event.points[0].text.split("|")[4]?.trim();
            const recording = recordings.find(r => r.file === file);
            if (recording) {
                isPlaying && recording === track ? pause() : play(recording)
            }
        }
    };
    
    useEffect(() => {
        fetchData()
            .then(setRecordings)
            .catch(e => notify(t("toast.error.fetchData"), NotificationType.ERROR, e));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchClusterData(clusterMaps[0].file);
    }, []);


    return (
        <Box px={"md"}>
            <Group>
                <Select
                    // w={75}
                    data={clusterMaps.map(c => c.name)}
                    defaultValue={clusterMaps[0].name}
                    onChange={(value) => {
                        const file = clusterMaps.find(c => c.name === value)?.file;
                        if (file) {
                            fetchClusterData(file);
                        }
                    }}
                />
                <Text>{`mAP: ${clusterMaps[0].mAP}  |  rank1: ${clusterMaps[0].rank1}`}</Text>
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
                style={{width: "100%", height: "1000px"}}
            />

            <LoadingOverlay visible={isLoading}/>
        </Box>
    );
};

export default ClusterPlot;
