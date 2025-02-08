import React, {useEffect, useMemo, useState} from "react";
import {Box, Group, LoadingOverlay, Select, Text} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useDataService} from "../../hooks/useDataService.tsx";
import {Recording} from "../../../../domain/Recording.ts";
import {useTranslation} from "react-i18next";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {ClusterMap} from "../../model/ClusterMap.ts";
import {ColorScheme} from "../../model/ColorScheme.ts";
import {
    ClusterMaps,
    ColorSchemes,
    Datasets,
    MarkerSymbols,
    generateModelVersionOptions,
    generateDatasetOptions,
    generateColorSchemeOptions
} from "../../utils/clusterplot.lists.ts";
import {ClusterData} from "../../model/ClusterData.ts";

const ClusterPlot: React.FC = () => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchData, cancelSource} = useDataService();
    const {notify} = useNotifications();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorSchemes[0]);
    const [clusterMap, setClusterMap] = useState<ClusterMap>(ClusterMaps[0]);
    const [dataset, setDataset] = useState<string>(Datasets[0]);

    const [data, setData] = useState<Plotly.Data[]>();
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const convertToPlotlyData = (data: ClusterData): Plotly.Data[] => {
        const groupedData: { [key: string]: any } = {};

        const numberOfColors = Math.ceil((new Set(data.work_list.filter(w => !!w))).size);

        const identifiedColors = colorScheme.identified.colors(numberOfColors);

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
                            ? identifiedColors[i % identifiedColors.length]
                            : colorScheme.unidentified,
                        symbol: work ? MarkerSymbols[i % MarkerSymbols.length] : "circle",
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

    const handleClick = (event: any) => {
        if (event.points.length > 0) {
            const file = event.points[0].text.split("|")[4]?.trim();
            const recording = recordings.find(r => r.file === file);
            if (recording) {
                isPlaying && recording === track ? pause() : play(recording)
            }
        }
    };

    const handleClusterMapChange = (value: string | null) => {
        const map = ClusterMaps.find(c => c.name === value);
        if (map) {
            setClusterMap(map);
        }
    }

    const handleColorShemeChange = (value: string | null) => {
        const scheme = ColorSchemes.find(c => c.name === value);
        if (scheme) {
            setColorScheme(scheme);
        }
    }

    const result = useMemo(() =>
        clusterMap.results.find(x => x.dataset === dataset), [clusterMap, dataset]);

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

        const result = clusterMap.results.find(x => x.dataset === dataset);
        if (result) {
            fetchClusterData(result.file);
        }
    }, [colorScheme, clusterMap, dataset]);


    return (
        <Box px={"md"}>
            <Group gap={"xl"}>
                <Group>
                    <Text fw={"bold"} size={"sm"}>
                        {t("view.clusterMap.label.modelVersion")}
                    </Text>
                    <Select
                        allowDeselect={false}
                        data={generateModelVersionOptions(t)}
                        value={clusterMap.name}
                        onChange={(value) => handleClusterMapChange(value)}
                    />
                </Group>
                <Group>
                    <Text fw={"bold"} size={"sm"} >
                        {t("view.clusterMap.label.dataset")}
                    </Text>
                    <Select
                        allowDeselect={false}
                        data={generateDatasetOptions(t)}
                        value={dataset}
                        onChange={(value) => setDataset(value || Datasets[0])}
                    />
                </Group>
                <Group>
                    <Text fw={"bold"} size={"sm"}>
                        {t("view.clusterMap.label.colorScheme")}
                    </Text>
                    <Select
                        allowDeselect={false}
                        data={generateColorSchemeOptions(t)}
                        value={colorScheme.name}
                        onChange={(value) => handleColorShemeChange(value)}
                    />
                </Group>
                <Group>
                    <Text fw={"bold"} size={"sm"}>
                        {t("view.clusterMap.label.map")}
                    </Text>
                    <Text size={"sm"}>{result?.mAP || "N/A"} </Text>

                </Group>
                <Group>
                    <Text fw={"bold"} size={"sm"}>
                        {t("view.clusterMap.label.rank1")}
                    </Text>
                    <Text size={"sm"}>{result?.rank1 || "N/A"} </Text>
                </Group>
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
