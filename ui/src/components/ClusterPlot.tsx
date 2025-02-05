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

const clusterMaps = ["cluster_data.json", "cluster_data-testset.json"];

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
    file_list: string[];
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
                        color: i,
                        colorscale: "Viridis",
                        symbol: markerSymbols[i % markerSymbols.length],
                    },
                    text: [],
                };
            }

            groupedData[work].x.push(data.x[i]);
            groupedData[work].y.push(data.y[i]);
            groupedData[work].text.push(data.label_list[i] + " | " + data.file_list[i]);
        });

        return Object.values(groupedData);
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
        fetchClusterData("cluster_data.json");
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
                <Select data={clusterMaps} defaultValue={"cluster_data.json"}
                        onChange={(value) => {
                            if (value) {
                                fetchClusterData(value)
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
