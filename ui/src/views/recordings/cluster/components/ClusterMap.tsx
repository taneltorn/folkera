import React, {useEffect, useState} from "react";
import {Button, Group, LoadingOverlay} from "@mantine/core";
import {useAudioPlayer} from "../../../../hooks/useAudioContext.tsx";
import {useDataService} from "../../../../services/useDataService.ts";
import {Recording} from "../../../../model/Recording.ts";
import {useTranslation} from "react-i18next";
import Plot from "react-plotly.js";
import Plotly, {LegendClickEvent} from "plotly.js";
import {useNotifications} from "../../../../hooks/useNotifications.tsx";
import {NotificationType} from "../../../../context/NotificationContext.tsx";
import {ColorScheme} from "../../../../model/ColorScheme.ts";
import {
    ClusterPlots,
    ColorSchemes,
    MarkerSymbols,
} from "../../../../utils/lists.ts";
import {ClusterData} from "../../../../model/ClusterData.ts";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {ClusterPlot} from "../../../../model/ClusterPlot.ts";
import BottomControlBar from "../../components/BottomControlBar.tsx";
import {FaRegEye} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

// @ts-ignore
interface ExtendedPlotlyData extends Plotly.Data {
    file: string;
}

// TODO: needs refactoring
const ClusterMap: React.FC = () => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchRecordings, cancelSource} = useDataService();

    const currentBreakpoint = useCurrentBreakpoint();

    const {notify} = useNotifications();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorSchemes[1]);
    const [clusterPlot, setClusterPlot] = useState<ClusterPlot>(ClusterPlots[0]);

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

        const correctly_identified_file_list = recordings.filter(r => !clusterPlot.newWorks || clusterPlot.newWorks?.includes(r.datatype as string))
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
                // } else if ( data.label_list[i].includes("RKM, Mgn. II 1483 d")) {
                //     groupedData["x"] = {
                //         x: [],
                //         y: [],
                //         mode: "markers",
                //         type: "scatter",
                //         name: "x",
                //         visible: true,
                //         opacity: 1,
                //         marker: {
                //             size: 40,
                //             color: "yellow",
                //             symbol: markerSymbol
                //             // symbol: work ? MarkerSymbols[i % MarkerSymbols.length] : "circle",
                //         },
                //         text: [],
                //         file: [],
                //     };
                //
                // groupedData["x"].x.push(data.x[i]);
                // groupedData["x"].y.push(data.y[i]);
                // groupedData["x"].text.push(data.label_list[i]);
                // groupedData["x"].file.push(data.file_list[i]);
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
        const map = ClusterPlots.find(c => c.name === value);
        if (map) {
            setClusterPlot(map);
            if (map.defaultColorScheme) {
                setColorScheme(map.defaultColorScheme);
            }
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
        fetchRecordings()
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

        const result = ClusterPlots.find(map => map.name === clusterPlot.name);
        if (result) {
            fetchClusterData(result.file);
        }
    }, [colorScheme, clusterPlot, recordings]);

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
        <>
            <BottomControlBar>
                <Group gap={4}>
                    <MenuSelect
                        title={t(`view.clusterMap.modelVersion.title`)}
                        label={t(`view.clusterMap.modelVersion.name.${clusterPlot.name}`, clusterPlot.name)}
                        options={ClusterPlots.map(map => ({
                            value: map.name,
                            label: t(`view.clusterMap.modelVersion.name.${map.name}`, map.name)
                        }))}
                        onChange={(value) => handleClusterMapChange(value)}
                    />

                    {activeWork &&
                        <Button variant={"subtle"} size={"sm"}
                                leftSection={<FaRegEye size={Size.icon.MD}/>}
                                onClick={handleReset}>
                            {t("button.showAll")}
                        </Button>}
                </Group>
                <Group gap={"md"} ml={"xl"}>
                    {clusterPlot?.mAP && <LabelValue
                        label={t("view.clusterMap.map")}
                        value={clusterPlot?.mAP || "N/A"}
                    />}
                    {clusterPlot?.rank1 && <LabelValue
                        label={t("view.clusterMap.rank1")}
                        value={clusterPlot?.rank1 || "N/A"}
                    />}

                </Group>
            </BottomControlBar>

            <Plot
                data={(data || []) as Plotly.Data[]}
                onClick={handleClick}
                onLegendClick={(event) => handleLegendClick(event)}
                onLegendDoubleClick={() => false}
                layout={{
                    title: "Interactive t-SNE Cluster Plot",
                    showlegend: !["xs", "sm"].includes(currentBreakpoint),
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
        </>
    );
};

export default ClusterMap;
