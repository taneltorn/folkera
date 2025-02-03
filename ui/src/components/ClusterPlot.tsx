import React, {useEffect, useState} from "react";
import {Box, LoadingOverlay} from "@mantine/core";
import {useAudioPlayer} from "../hooks/useAudioContext.tsx";
import {useDataService} from "../hooks/useDataService.tsx";
import {Recording} from "../../../domain/Recording.ts";
import {DisplayError} from "../utils/common.helpers.tsx";
import {useTranslation} from "react-i18next";

import Plot from "react-plotly.js";
import Plotly from "plotly.js-dist-min";

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

    const [data, setData] = useState<Plotly.Data[]>();
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const convertToPlotlyData = (data: ClusterData): Plotly.Data[] => {
        const groupedData: { [key: string]: Plotly.Data } = {};

        for (let i = 0; i < data.work_list.length; i++) {
            const work = data.work_list[i];
            if (!groupedData[work]) {
                groupedData[work] = {
                    work: work,
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
                    file: []
                };
            }

            groupedData[work].x.push(data.x[i]);
            groupedData[work].y.push(data.y[i]);
            groupedData[work].text.push(data.label_list[i] + " | " + data.file_list[i]);
        }

        return Object.values(groupedData);
    }

    useEffect(() => {
        console.log("fetching recordings");
        fetchData()
            .then(setRecordings)
            .catch(e => DisplayError(e, t("toast.error.fetchData")));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetch("/cluster_data.json")
            .then((response) => response.json())
            // .then((json) => setData(json))
            .then((json: ClusterData) => {
                const data = convertToPlotlyData(json);
                data.sort((a, b) => a.name.localeCompare(b.name));
                setData(data);
            })
            .catch((error) => console.error("Error loading cluster data:", error))
            .finally(() => setIsLoading(false));
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
                    },
                    yaxis: {
                        visible: false,
                    }
                }}
                style={{width: "100%", height: "800px"}}
            />

            <LoadingOverlay visible={isLoading}/>
        </Box>
    );
};

export default ClusterPlot;
