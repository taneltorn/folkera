import React, {useEffect, useState} from "react";
import {LoadingOverlay} from "@mantine/core";
import {useAudioPlayer} from "../../../../hooks/useAudioContext.tsx";
import {useTuneService} from "../../../../services/useTuneService.ts";
import {Tune} from "../../../../model/Tune.ts";
import {useTranslation} from "react-i18next";
import Plot from "react-plotly.js";
import Plotly, {LegendClickEvent} from "plotly.js";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {ToastType} from "../../../../context/ToastContext.tsx";
import {ClusterPlots, ColorSchemes, MarkerSymbols} from "../../../../utils/lists.ts";
import {ClusterData} from "../../../../model/ClusterData.ts";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";
import {useClusterContext} from "../../../../hooks/useClusterContext.tsx";

// @ts-ignore
interface ExtendedPlotlyData extends Plotly.Data {
    file: string;
}

const ClusterPlot: React.FC = () => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchTunes, cancelSource} = useTuneService();
    const currentBreakpoint = useCurrentBreakpoint();
    const {notify} = useToasts();

    const {
        clusterPlot,
        colorScheme,
        setColorScheme,
        activeWork,
        setActiveWork
    } = useClusterContext();

    const [plotData, setPlotData] = useState<ExtendedPlotlyData[]>([]);
    const [tunes, setTunes] = useState<Tune[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchClusterData = (file: string) => {
        fetch(file)
            .then((response) => response.json())
            .then((json: ClusterData) => {
                const data = convertToPlotlyData(json);
                // @ts-ignore
                data.sort((a, b) => a.name.localeCompare(b.name));
                setPlotData(data);
            })
            .catch((error) => console.error("Error loading cluster data:", error))
            .finally(() => setIsLoading(false));
    }

    const convertToPlotlyData = (data: ClusterData): ExtendedPlotlyData[] => {
        const groupedData: { [key: string]: any } = {};

        const numberOfColors = Math.ceil((new Set(data.work_list.filter(w => !!w))).size);
        const identifiedColors = colorScheme.scale.colors(numberOfColors);

        const workMarkers = new Map([]);

        data.work_list.forEach((work, i) => {

            const markerSymbol = work ? (workMarkers.get(work) || MarkerSymbols[i % MarkerSymbols.length]) : "circle";
            if (work && !workMarkers.has(work)) {
                workMarkers.set(work, markerSymbol);
            }

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
                        symbol: markerSymbol
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

            const tune = tunes.find(r => r.audio === file);
            if (tune) {
                isPlaying && tune === track ? pause() : play(tune)
            }
        }
    };

    const handleLegendClick = (event: LegendClickEvent) => {
        setActiveWork(activeWork === event.node.textContent ? null : event.node.textContent);
        return false;
    }

    useEffect(() => {
        fetchTunes()
            .then(r => setTunes(r.data))
            .catch(e => notify(t("toast.error.fetchData"), ToastType.ERROR, e));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    useEffect(() => {
        if (tunes.length === 0) {
            return;
        }
        setIsLoading(true);

        const result = ClusterPlots.find(map => map.file === clusterPlot.file);
        if (result) {
            fetchClusterData(result.file);
            const colorScheme = ColorSchemes.find(cs => cs.type === result.colorSchemeType);
            if (colorScheme) {
                setColorScheme(colorScheme);
            }
        }
    }, [colorScheme, clusterPlot, tunes]);

    useEffect(() => {
        if (!plotData.length) {
            return;
        }
        setPlotData(plotData.map(trace => ({
            ...trace,
            // @ts-ignore
            opacity: activeWork === null || trace.name === activeWork ? 1 : 0
        })))
    }, [activeWork]);

    return (
        <>
            <Plot
                data={(plotData || []) as Plotly.Data[]}
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
                style={{width: "100%", maxHeight: "900px"}}
            />
            <LoadingOverlay visible={isLoading}/>
        </>
    );
};

export default ClusterPlot;
