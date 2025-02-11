import React, {useEffect, useMemo, useState} from "react";
import {Box, Button, Group, LoadingOverlay} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useDataService} from "../../hooks/useDataService.tsx";
import {Recording} from "../../../../domain/Recording.ts";
import {useTranslation} from "react-i18next";
import Plot from "react-plotly.js";
import Plotly, {LegendClickEvent} from "plotly.js";
import {useNotifications} from "../../hooks/useNotifications.tsx";
import {NotificationType} from "../../context/NotificationContext.tsx";
import {ClusterMap} from "../../model/ClusterMap.ts";
import {ColorScheme} from "../../model/ColorScheme.ts";
import {
    ClusterMaps,
    ColorSchemes,
    Datasets,
    MarkerSymbols,
    generateDatasetOptions,
    generateColorSchemeOptions
} from "../../utils/clusterplot.lists.ts";
import {ClusterData} from "../../model/ClusterData.ts";
import MenuSelect from "../recording/controls/components/MenuSelect.tsx";
import LabelValue from "../recording/controls/components/LabelValue.tsx";

// @ts-ignore
interface ExtendedPlotlyData extends Plotly.Data {
    file: string;
}

const ClusterPlot: React.FC = () => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchData, cancelSource} = useDataService();
    const {notify} = useNotifications();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorSchemes[0]);
    const [clusterMap, setClusterMap] = useState<ClusterMap>(ClusterMaps[0]);
    const [dataset, setDataset] = useState<string>(Datasets[0]);
    const [showLegend, setShowLegend] = useState<boolean>(true);

    const [data, setData] = useState<ExtendedPlotlyData[]>([]);
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeWork, setActiveWork] = useState<string | null>(null);

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

    const convertToPlotlyData = (data: ClusterData): ExtendedPlotlyData[] => {
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
                    visible: true,
                    opacity: 1,
                    marker: {
                        size: work ? 10 : 6,
                        color: work
                            ? identifiedColors[i % identifiedColors.length]
                            : colorScheme.unidentified,
                        symbol: work ? MarkerSymbols[i % MarkerSymbols.length] : "circle",
                    },
                    text: [],
                    file: [],
                };
            }

            groupedData[work].x.push(data.x[i]);
            groupedData[work].y.push(data.y[i]);
            groupedData[work].text.push(data.label_list[i]);
            groupedData[work].file.push(data.file_list[i]);
        });

        return Object.values(groupedData);
    }

    const handleClick = (event: any) => {
        if (event.points.length > 0) {
            const trace = event.points[0];

            // @ts-ignore
            const index = trace.data.text.findIndex(text => text === trace.text);
            const file = trace.data.file[index];

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

    const handleColorSchemeChange = (value: string | null) => {
        const scheme = ColorSchemes.find(c => c.name === value);
        if (scheme) {
            setColorScheme(scheme);
        }
    }

    const handleLegendClick = (event: LegendClickEvent) => {
        setActiveWork(activeWork === event.node.textContent ? null : event.node.textContent);
        return false;
    }

    const handleReset = () => {
        setActiveWork(null);
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

    useEffect(() => {
        if (!data.length) {
            return;
        }
        setData(data.map(trace => ({
            ...trace,
            // @ts-ignore
            opacity: activeWork === null || trace.name === activeWork ? 1 : 0.1
        })))
    }, [activeWork]);

    return (
        <Box px={"md"}>
            <Group justify={"space-between"}>
                <Group gap={4}>
                    <MenuSelect
                        title={t(`view.clusterMap.modelVersion.title`)}
                        label={t(`view.clusterMap.modelVersion.label`, {name: t(`view.clusterMap.modelVersion.${clusterMap.name}`)})}
                        options={ClusterMaps.map(map => ({
                            value: map.name,
                            label: t(`view.clusterMap.modelVersion.${map.name}`)
                        }))}
                        onChange={(value) => handleClusterMapChange(value)}
                    />

                    <MenuSelect
                        title={t(`view.clusterMap.dataset.title`)}
                        label={t(`view.clusterMap.dataset.label`, {name: t(`view.clusterMap.dataset.${dataset}`)})}
                        options={generateDatasetOptions(t)}
                        onChange={(value) => setDataset(value)}
                    />

                    <MenuSelect
                        title={t(`view.clusterMap.colorScheme.title`)}
                        label={t(`view.clusterMap.colorScheme.label`, {name: t(`view.clusterMap.colorScheme.${colorScheme.name}`)})}
                        options={generateColorSchemeOptions(t)}
                        onChange={(value) => handleColorSchemeChange(value)}
                    />

                    
                    
                    {activeWork &&
                        <Button variant={"subtle"} size={"sm"} onClick={handleReset}>
                            {t("button.reset")}
                        </Button>}

                </Group>
                <Group gap={"md"} ml={"xl"}>
                    <LabelValue
                        label={t("view.clusterMap.map")}
                        value={result?.mAP || "N/A"}
                    />
                    <LabelValue
                        label={t("view.clusterMap.rank1")}
                        value={result?.rank1 || "N/A"}
                    />
                </Group>
            </Group>
            <Plot
                data={(data || []) as Plotly.Data[]}
                onClick={handleClick}
                onLegendClick={(event) => handleLegendClick(event)}
                onLegendDoubleClick={() => false}
                layout={{
                    title: "Interactive t-SNE Cluster Plot",
                    showlegend: showLegend,
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
