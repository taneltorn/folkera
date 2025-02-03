import React, {useEffect, useState} from "react";
// import Plot from "react-plotly.js";
import {Box, LoadingOverlay} from "@mantine/core";
// import * as Plotly from "plotly.js";
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

interface ClusterPlotData {
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
            .then((json: ClusterPlotData) => {
                const uniquePerformances = Array.from(new Set(json.label));
                const data: Plotly.Data[] = uniquePerformances.map((label, index) => {
                    const indices = json.label.map((lbl, i) => (lbl === label ? i : -1)).filter(i => i !== -1);

                    return {
                        x: indices.map(i => json.x[i]),
                        y: indices.map(i => json.y[i]),
                        mode: "markers",
                        type: "scatter",
                        name: json.work_list[indices[0]],
                        marker: {
                            size: 10,
                            color: index,
                            colorscale: "Viridis",
                            symbol: markerSymbols[index % markerSymbols.length],
                        },
                        text: indices.map(i => json.label_list[i]),
                        file: indices.map(i => json.file_list[i]),
                    };
                });

                // @ts-ignore
                data.sort((a, b) => a.name.localeCompare(b.name));
                setData(data);
            })
            .catch((error) => console.error("Error loading cluster data:", error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleClick = (event: any) => {
        if (event.points.length > 0) {
            const recording = recordings.find(r => r.file === event.points[0].data.file[0]);

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
