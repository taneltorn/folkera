import React, {useMemo, useRef} from "react";
import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import chroma from 'chroma-js';
import {MapOptions} from "../model/MapOptions.ts";
import moment from "moment";
import {GeoJsonStyle} from "../utils/map.helpers.ts";
import {Box} from "@mantine/core";

import {GroupBy} from "../model/GroupBy.ts";

interface Properties {
    stats: { [key: string]: number }[];
    layers: any;
    options: MapOptions;
    groupBy: GroupBy;
    onClick?: (value: string) => void;
}

const LabelPositions = new Map<string, number[]>([]);

// todo: refactor
const MapTemplate: React.FC<Properties> = ({stats, layers, groupBy, options, onClick}) => {

    const mapContainerRef = useRef<any>(null);
    const geoJsonLayerRef = useRef<any>(null);

    // @ts-ignore
    let maxValue = useMemo<number>(() => Math.max(...(Object.values(stats) as number[])), [stats]);
    maxValue = Math.max(maxValue, 50)
    const geoJsonKey = useMemo(() => `geo-${moment.now()}}`, [options, layers, stats])

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            const parish = groupBy === GroupBy.PARISH && !feature.properties.NIMI.endsWith("linn")
            && feature.properties.NIMI !== "Setumaa"
                ? feature.properties.NIMI + " khk."
                : feature.properties.NIMI;


            // @ts-ignore
            const count = stats[`${parish}`] || 0;

            let color = "#ccc";
            if (options.asHeatMap) {
                // const scale = chroma.scale(['#D1C4E9', '#1A237E']).domain([1, maxValue * (1 - options.heatIntensity)]);
                const scale = chroma.scale("YlOrBr").domain([-(maxValue / 4), maxValue * (1 - options.heatIntensity)]);

                // @ts-ignore
                color = count === 0 ? "#fff" : scale(count).hex();
            }

            const correction = LabelPositions.get(parish) || [0, 0];
            const tooltipContent = `
                <div style="text-align: center;position: relative;top: ${correction[0]}px;left: ${correction[1]}px;">
                    <div style="font-size: ${options.textSize}px">${parish?.replaceAll(" khk.", "")}</div>
                    ${options.showCounts ? `<div style="font-size: ${options.textSize}px; font-weight: bold;">${count}</div>` : ''}
                </div>
            `;

            layer.setStyle({
                color: "#333",
                fillColor: color,
                weight: 2,
                fillOpacity: options.asHeatMap ? 1 : 0.3,
            });

            layer.bindTooltip(
                tooltipContent,
                {permanent: true, direction: "center", className: "parish-label", interactive: true}
            );

            layer.on('click', () => {
                onClick && onClick(parish);
            });

            layer.on('mouseover', () => {
                layer.setStyle({
                    fillColor: "#FF7043",
                });
            });

            layer.on('mouseout', () => {
                layer.setStyle({
                    fillColor: color,
                });
            });
        }
    };

    return (
        <Box>
            <MapContainer
                ref={mapContainerRef}
                center={{lat: options.position.coords[0], lng: options.position.coords[1]}}
                zoom={options.position.zoom}
                minZoom={8}
                maxZoom={10}
                style={{height: "800px", width: "100%", zIndex: 10}}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                    subdomains={['a', 'b', 'c']}
                    maxZoom={15}
                />
                {layers && (
                    <GeoJSON
                        key={geoJsonKey}
                        ref={geoJsonLayerRef}
                        data={layers}
                        style={GeoJsonStyle}
                        onEachFeature={onEachFeature}
                    />
                )}
            </MapContainer>
        </Box>
    );
}

export default MapTemplate;
