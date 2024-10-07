import React, {useMemo, useRef} from "react";
import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import {isEmpty} from "../utils/common.helpers.tsx";
import chroma from 'chroma-js';
import {MapOptions} from "../model/MapOptions.ts";
import moment from "moment";
import {GeoJsonStyle} from "../utils/map.helpers.ts";
import {Filter} from "../context/DataFilteringContext.tsx";

interface Properties {
    data: Map<string, number>;
    layers: any;
    filters: Filter[];
    options: MapOptions;
    onClick?: (value: string) => void;
}

const MapTemplate: React.FC<Properties> = ({data, layers, filters, options, onClick}) => {

    const mapContainerRef = useRef<any>(null);
    const geoJsonLayerRef = useRef<any>(null);

    const maxValue = useMemo<number>(() => Math.max(...Object.values(data) as number[]), [data]);
    const geoJsonKey = useMemo(() => `geo-${moment.now()}}`, [options, layers, filters])

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            const location = feature.properties.KIHELKOND;

            // @ts-ignore
            const count = data[`${location}`] || 0;

            let color = "#ccc";
            if (options.asHeatMap) {
                const scale = chroma.scale(['#FFE45E', '#9C0000']).domain([1, maxValue * (1 - options.heatIntensity)]);
                // @ts-ignore
                color = count === 0 ? "#fff" : scale(count).hex();
            }

            const tooltipContent = `
                <div style="text-align: center;">
                    <div style="font-size: ${options.textSize}px">${location?.replaceAll(" khk.", "")}</div>
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
                onClick && onClick(location);
            });

            layer.on('mouseover', () => {
                layer.setStyle({
                    fillColor: "orange",
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
        <MapContainer
            ref={mapContainerRef}
            center={{lat: options.position.coords[0], lng: options.position.coords[1]}}
            zoom={options.position.zoom}
            style={{height: "100vh", width: "100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {layers && !isEmpty(data) && (
                <GeoJSON
                    key={geoJsonKey}
                    ref={geoJsonLayerRef}
                    data={layers}
                    style={GeoJsonStyle}
                    onEachFeature={onEachFeature}
                />
            )}
        </MapContainer>
    );
}

export default MapTemplate;
