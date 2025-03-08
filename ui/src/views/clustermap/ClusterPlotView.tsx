import React, {useEffect, useState} from "react";
import {Box, Button, Group, LoadingOverlay} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useDataService} from "../../services/useDataService.tsx";
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
    MarkerSymbols,
} from "../../utils/lists.ts";
import {ClusterData} from "../../model/ClusterData.ts";
import MenuSelect from "../../components/MenuSelect.tsx";
import LabelValue from "../../components/LabelValue.tsx";
import Page from "../../Page.tsx";

// @ts-ignore
interface ExtendedPlotlyData extends Plotly.Data {
    file: string;
}

const ClusterPlotView: React.FC = () => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchData, cancelSource} = useDataService();
    const {notify} = useNotifications();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorSchemes[1]);
    const [clusterMap, setClusterMap] = useState<ClusterMap>(ClusterMaps[0]);

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
        const identifiedColors = colorScheme.known.colors(numberOfColors);

        const correctly_identified_file_list = recordings.filter(r => !clusterMap.newWorks || clusterMap.newWorks?.includes(r.datatype as string))
            .map(r => r.file);

        const workMarkers = new Map([]);

        data.work_list.forEach((work, i) => {

            const markerSymbol = work ? (workMarkers.get(work) || MarkerSymbols[i % MarkerSymbols.length]) : "circle";
            if (work && !workMarkers.has(work)) {
                workMarkers.set(work, markerSymbol);
            }

            const correctlyIdentified = correctly_identified_file_list.includes(data.file_list[i]);

            if (correctlyIdentified && colorScheme.correctlyIdentified) {
                const workName = work + " ";
                if (!groupedData[workName]) {
                    groupedData[workName] = {
                        x: [],
                        y: [],
                        mode: "markers",
                        type: "scatter",
                        name: workName,
                        visible: true,
                        opacity: 1,
                        marker: {
                            size: 10,
                            color: colorScheme.correctlyIdentified || colorScheme.unidentified,
                            symbol: markerSymbol
                            // symbol: work ? MarkerSymbols[i % MarkerSymbols.length] : "circle",
                        },
                        text: [],
                        file: [],
                    };
                }

                groupedData[workName].x.push(data.x[i]);
                groupedData[workName].y.push(data.y[i]);
                groupedData[workName].text.push(data.label_list[i]);
                groupedData[workName].file.push(data.file_list[i]);
                // } else if ( data.file_list[i].endsWith("M2-2630--n)--Polka__loots.mp3")) {
                //         groupedData["x"] = {
                //             x: [],
                //             y: [],
                //             mode: "markers",
                //             type: "scatter",
                //             name: "x",
                //             visible: true,
                //             opacity: 1,
                //             marker: {
                //                 size: 80,
                //                 color: "yellow",
                //                 symbol: markerSymbol
                //                 // symbol: work ? MarkerSymbols[i % MarkerSymbols.length] : "circle",
                //             },
                //             text: [],
                //             file: [],
                //         };
                //
                //     groupedData["x"].x.push(data.x[i]);
                //     groupedData["x"].y.push(data.y[i]);
                //     groupedData["x"].text.push(data.label_list[i]);
                //     groupedData["x"].file.push(data.file_list[i]);
            } else {
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
                            size: work ? 10 : 8,
                            color: work
                                ? identifiedColors[i % identifiedColors.length]
                                : colorScheme.unidentified,
                            symbol: markerSymbol
                            // symbol: work ? MarkerSymbols[i % MarkerSymbols.length] : "circle",
                        },
                        text: [],
                        file: [],
                    };
                }

                groupedData[work].x.push(data.x[i]);
                groupedData[work].y.push(data.y[i]);
                groupedData[work].text.push(data.label_list[i]);
                groupedData[work].file.push(data.file_list[i]);
            }

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
            if (map.defaultColorScheme) {
                setColorScheme(map.defaultColorScheme);
            }
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

    useEffect(() => {
        fetchData()
            .then(r => setRecordings(r.data))
            .catch(e => notify(t("toast.error.fetchData"), NotificationType.ERROR, e));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    useEffect(() => {
        if (recordings.length === 0) {
            return;
        }
        setIsLoading(true);

        const result = ClusterMaps.find(map => map.name === clusterMap.name);
        if (result) {
            fetchClusterData(result.file);
        }
    }, [colorScheme, clusterMap, recordings]);

    useEffect(() => {
        if (!data.length) {
            return;
        }
        setData(data.map(trace => ({
            ...trace,
            // @ts-ignore
            opacity: activeWork === null || trace.name === activeWork ? 1 : 0
        })))
    }, [activeWork]);

    return (
        <Page title={t("page.title.clusterMap")}>
            <Box mx={"md"}>
                <Group justify={"space-between"}>
                    <Group gap={4}>
                        <MenuSelect
                            title={t(`view.clusterMap.modelVersion.title`)}
                            label={t(`view.clusterMap.modelVersion.name.${clusterMap.name}`, clusterMap.name)}
                            options={ClusterMaps.map(map => ({
                                value: map.name,
                                label: t(`view.clusterMap.modelVersion.name.${map.name}`, map.name)
                            }))}
                            onChange={(value) => handleClusterMapChange(value)}
                        />

                        <MenuSelect
                            title={t(`view.clusterMap.colorScheme.title`)}
                            label={t(`view.clusterMap.colorScheme.label`, {name: t(`view.clusterMap.colorScheme.${colorScheme.name}`)})}
                            options={ColorSchemes.map(scheme => ({
                                value: scheme.name,
                                label: t(`view.clusterMap.colorScheme.${scheme.name}`)
                            }))}
                            onChange={(value) => handleColorSchemeChange(value)}
                        />


                    </Group>
                    <Group gap={"md"} ml={"xl"}>
                        {clusterMap?.mAP && <LabelValue
                            label={t("view.clusterMap.map")}
                            value={clusterMap?.mAP || "N/A"}
                        />}
                        {clusterMap?.rank1 && <LabelValue
                            label={t("view.clusterMap.rank1")}
                            value={clusterMap?.rank1 || "N/A"}
                        />}

                        {activeWork &&
                            <Button variant={"subtle"} size={"sm"} onClick={handleReset}>
                                {t("button.showAll")}
                            </Button>}
                    </Group>
                </Group>
                <Plot
                    data={(data || []) as Plotly.Data[]}
                    onClick={handleClick}
                    onLegendClick={(event) => handleLegendClick(event)}
                    onLegendDoubleClick={() => false}
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
        </Page>
    );
};

export default ClusterPlotView;
