import React, {useEffect, useMemo, useState} from "react";
import {LoadingOverlay, useMantineTheme} from "@mantine/core";
import {useTranslation} from "react-i18next";
import Plot from "react-plotly.js";
import Plotly, {LegendClickEvent} from "plotly.js";
import {useAudioPlayer} from "../../../../hooks/useAudioContext.tsx";
import {useTuneService} from "../../../../services/useTuneService.ts";
import {useToasts} from "../../../../hooks/useToasts.tsx";
import {useClusterContext} from "../../../../hooks/useClusterContext.tsx";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";
import {ToastType} from "../../../../context/ToastContext.tsx";
import {ClusterPlots, ColorSchemes, MarkerSymbols} from "../../../../utils/lists.ts";
import {Tune} from "../../../../model/Tune.ts";
import {ClusterData} from "../../../../model/ClusterData.ts";

// @ts-ignore
interface ExtendedPlotlyData extends Plotly.Data {
    file: string[];
    name: string;
}

interface Properties {
    needle?: string;
}

const ClusterPlot: React.FC<Properties> = ({needle}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {fetchTunes, cancelSource} = useTuneService();
    const currentBreakpoint = useCurrentBreakpoint();
    const {notify} = useToasts();

    const {
        clusterPlot,
        colorScheme,
        setColorScheme,
        activeWork,
        setActiveWork,
    } = useClusterContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [tunes, setTunes] = useState<Tune[]>([]);
    const [clusterData, setClusterData] = useState<ClusterData | null>(null);

    const shouldShowLegend = !["xs", "sm"].includes(currentBreakpoint);

    const numberOfColors = useMemo(() => {
        if (!clusterData) return 0;
        return Math.ceil((new Set(clusterData.work_list.filter(w => !!w))).size);
    }, [clusterData]);

    const identifiedColors = useMemo(() => {
        if (!numberOfColors) return [];
        return colorScheme.scale.colors(numberOfColors);
    }, [colorScheme, numberOfColors]);

    const fetchClusterData = (file: string) => {
        setIsLoading(true);

        fetch(file)
            .then((response) => response.json())
            .then((json: ClusterData) => setClusterData(json))
            .catch((error) => console.error("Error loading cluster data:", error))
            .finally(() => setIsLoading(false));
    };

    const convertToPlotlyData = (data: ClusterData): ExtendedPlotlyData[] => {
        const groupedData: Record<string, any> = {};
        const workMarkers = new Map<string, string>();

        const highlight = {
            x: [] as number[],
            y: [] as number[],
            text: [] as string[],
            file: [] as string[],
        };

        data.work_list.forEach((work, i) => {
            const label = data.label_list[i];
            const file = data.file_list[i];

            if (needle && label.startsWith(needle)) {
                highlight.x.push(data.x[i]);
                highlight.y.push(data.y[i]);
                highlight.text.push(label);
                highlight.file.push(file);
            }

            const markerSymbol = work
                ? (workMarkers.get(work) || MarkerSymbols[i % MarkerSymbols.length])
                : "circle";

            if (work && !workMarkers.has(work)) {
                workMarkers.set(work, markerSymbol);
            }

            const key = work || "";
            if (!groupedData[key]) {
                groupedData[key] = {
                    x: [],
                    y: [],
                    mode: "markers",
                    type: "scatter",
                    name: work || "",
                    showlegend: true,
                    visible: true,
                    opacity: 1,
                    marker: {
                        size: work ? 10 : 6,
                        color: work
                            ? identifiedColors[i % identifiedColors.length]
                            : colorScheme.unidentified,
                        symbol: markerSymbol,
                    },
                    text: [],
                    file: [],
                };
            }

            groupedData[key].x.push(data.x[i]);
            groupedData[key].y.push(data.y[i]);
            groupedData[key].text.push(label);
            groupedData[key].file.push(file);
        });

        const traces = Object.values(groupedData) as ExtendedPlotlyData[];
        if (highlight.x.length) {
            traces.push({
                x: highlight.x,
                y: highlight.y,
                mode: "markers",
                type: "scatter",
                name: "indicator",
                showlegend: false,
                hoverinfo: "text",
                text: highlight.text,
                file: highlight.file,
                marker: {
                    size: 33,
                    color: "transparent",
                    symbol: "circle",
                    line: {width: 4, color: theme.colors.red[7]},
                },
            } as ExtendedPlotlyData);
        }

        const highlightTrace = traces.find(tr => tr.name === "indicator");
        const normalTraces = traces.filter(tr => tr.name !== "indicator");
        // @ts-ignore
        normalTraces.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

        return highlightTrace ? [...normalTraces, highlightTrace] : normalTraces;
    };

    const plotData = useMemo(() => {
        if (!clusterData) return [];

        const data = convertToPlotlyData(clusterData);

        return data.map((trace) => ({
            ...trace,
            // @ts-ignore
            opacity:
                trace.name === "indicator"
                    ? 1
                    : (activeWork === null || trace.name === activeWork ? 1 : 0),
        }));
    }, [clusterData, activeWork, identifiedColors, colorScheme, needle]);

    const handleClick = (event: any) => {
        if (!event?.points?.length) return;

        const point = event.points[0];
        const idx: number | undefined = point.pointNumber;

        let file: string | undefined;
        if (typeof idx === "number" && point?.data?.file?.[idx]) {
            file = point.data.file[idx];
        } else {
            // @ts-ignore
            const index = point.data.text.findIndex((text: string) => text === point.text);
            file = point.data.file?.[index];
        }

        if (!file) return;

        const tune = tunes.find(r => r.audio === file);
        if (!tune) return;

        isPlaying && tune === track ? pause() : play(tune);
    };

    const handleLegendClick = (event: LegendClickEvent) => {
        const clicked = event?.node?.textContent || null;
        setActiveWork(activeWork === clicked ? null : clicked);
        return false;
    };

    useEffect(() => {
        fetchTunes()
            .then(r => setTunes(r.data))
            .catch(e => notify(t("toast.error.fetchData"), ToastType.ERROR, e));

        return () => {
            cancelSource.cancel("Operation canceled by the user.");
        };
    }, []);

    useEffect(() => {
        if (!tunes.length) return;

        const result = ClusterPlots.find(map => map.file === clusterPlot.file);
        if (!result) return;

        const scheme = ColorSchemes.find(cs => cs.type === result.colorSchemeType);
        if (scheme) setColorScheme(scheme);

        fetchClusterData(result.file);
    }, [clusterPlot, tunes]);

    return (<>
            <Plot
                data={plotData as Plotly.Data[]}
                onClick={handleClick}
                onLegendClick={handleLegendClick}
                onLegendDoubleClick={() => false}
                layout={{
                    title: "Interactive t-SNE Cluster Plot",
                    showlegend: shouldShowLegend,
                    dragmode: "zoom",
                    autosize: true,
                    xaxis: {visible: false, uirevision: "time"},
                    yaxis: {visible: false, uirevision: "time"},
                }}
                style={{width: "100%", maxHeight: "900px"}}
            />

            <LoadingOverlay visible={isLoading}/>
        </>
    );
};

export default ClusterPlot;