import React, {useEffect, useMemo, useRef, useState} from "react";
import {MapContainer, TileLayer, GeoJSON, Marker, Popup} from "react-leaflet";
import {DefaultMapOptions, GeoJsonStyle} from "../../utils/map.helpers.ts";
import {Box, Group, Slider, Switch} from "@mantine/core";
import {useStatsService} from "../../hooks/useStatsService.tsx";
import {StatsItem} from "../../model/Stats.ts";
import moment from "moment/moment";
import chroma from "chroma-js";
import * as turf from "@turf/turf";
import L from "leaflet";


const s = 45;
const customIcon = L.icon({
    iconUrl: 'map-marker.png',

    // shadowSize: [20,20],
    iconSize:     [s, s], // size of the icon
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


const NataliMap: React.FC = () => {

    const mapContainerRef = useRef<any>(null);
    const geoJsonLayerRef = useRef<any>(null);

    const {fetchStats} = useStatsService();

    const [data, setData] = useState<any[]>([]);
    const [stats, setStats] = useState<StatsItem[]>([]);
    const [layers, setLayers] = useState<any>();


    const [showMarkers, setShowMarkers] = useState<boolean>(true);
    const [showHeat, setShowHeat] = useState<boolean>(false);
    const [showCount, setShowCount] = useState<boolean>(false);
    const [showLabels, setShowLabels] = useState<boolean>(true);
    const [textSize, setTextSize] = useState<number>(14);

    const offset = new Map([
        ["Karuse", [20,20]],
        ["Mihkli", [-20,0]],
        ["Lihula", [10,5]],
        ["Kirbla", [10,25]],
        ["Vigala", [10,0]],
        ["Kullamaa", [0,10]],
        ["Martna", [20,-20]],
        ["Ridala", [-30,0]],
    ])

    // @ts-ignore
    const maxValue = useMemo<number>(() => Math.max(...(Object.values(stats) as number[])), [stats]);
    const geoJsonKey = useMemo(() => `geo-${moment.now()}}`, [layers, stats, showMarkers, showHeat, showLabels, textSize, showCount])

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            const location = feature.properties.NIMI.replaceAll(" khk.", "").trim();
            // @ts-ignore
            const count = stats[`${location}`] || 0;

            const o = offset.get(location) || [0,0];

            const tooltipContent = `
               <div style="text-align: center;position:relative;top:${o[0]}px;left:${o[1]}px;" >
                  ${showLabels ? `<div style="font-size: ${textSize}px">${location}</div>` : ""}
                  ${showCount ? `<div style="font-size: ${textSize}px">${count}</div>` : ""}
                </div>
                `;
            const scale = chroma.scale(['#FFE45E', '#9C0000']).domain([1, maxValue * (1 - 0.2)]);
            // const scale = chroma.scale(['#D1C4E9', '#1A237E']).domain([1, maxValue * (1 - 0.2)]);

            const valid = ["Lääne-Nigula", "Varbla", "Märjamaa", "Hanila", "Karuse", "Mihkli", "Lihula", "Kirbla", "Vigala", "Kullamaa", "Martna", "Ridala"];
            const isValid = valid.includes(location);
            // const isValid = true;
            let color = isValid ? "#9DC209" : "#999";
            let opacity = isValid ? 1 : 0;

            if (showHeat) {
                // @ts-ignore
                color = count === 0 ? "#fff" : scale(count).hex();
                opacity = 1;
            }

            layer.setStyle({
                color: "#333",
                fillColor: color,
                weight: 2,
                fillOpacity: opacity,
            });

            layer.bindTooltip(
                tooltipContent,
                {permanent: true, direction: "center", className: "parish-label", interactive: true}
            );
        }
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/recordings/file?path=natali.csv`)
            .then(response => response.json())
            .then(data => {
                fetchStats(data, {
                    groupBy: "Kihelkond"
                }).then(r => setStats(r));

                setData(data);
            });

        fetch(`/maps/natali2.json`)
            .then(response => response.json())
            .then(data => {
                setLayers(data);
            });


        Promise.all([
            fetch("/maps/a.json"),
            fetch("/maps/b.json"),
        ]).then(async ( [a, b]) => {

            const polya = await a.json()
            const polyb = await b.json()
            console.log(polya.geometry.coordinates)
            console.log(polyb.geometry.coordinates)

            console.log("poly1")

            const poly1 = turf.multiPolygon(polya.geometry.coordinates)
            console.log(poly1)

            console.log("poly2")

            const poly2 = turf.multiPolygon(polyb.geometry.coordinates)
            console.log(poly2)

            console.log("intersection")
            var intersection = turf.intersect(turf. featureCollection([poly1, poly2]));
            console.log(intersection)
        })



    }, []);

    return (
        <Box>
            <Group px={"md"} mb={"md"}>
                <Switch label={"Markers"} checked={showMarkers} onClick={() => setShowMarkers(!showMarkers)}/>
                <Switch label={"Heat"} checked={showHeat} onClick={() => setShowHeat(!showHeat)}/>
                <Switch label={"Labels"} checked={showLabels} onClick={() => setShowLabels(!showLabels)}/>
                <Switch label={"Count"} checked={showCount} onClick={() => setShowCount(!showCount)}/>
                <Slider label={"Aa"} min={8} max={24} step={2} w={300} value={textSize} onChange={(v) => setTextSize(v)}/>

            </Group>
            <MapContainer
                ref={mapContainerRef}
                center={{lat: DefaultMapOptions.position.coords[0], lng: DefaultMapOptions.position.coords[1]}}
                zoom={DefaultMapOptions.position.zoom}
                style={{height: "100vh", width: "100%", zIndex: 10}}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                    subdomains={['a', 'b', 'c']}
                    maxZoom={20}
                />
                {showMarkers && data && data.map((item: any, index: number) => (
                    <Marker
                        key={index}
                        position={[item.X, item.Y]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div>
                                <strong>{item.name}</strong><br/>
                                {item.description}
                            </div>
                        </Popup>
                    </Marker>
                ))}
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

export default NataliMap;
