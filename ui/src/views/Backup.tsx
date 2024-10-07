// import React, { useEffect, useRef, useState} from "react";
// import {MapContainer, TileLayer, GeoJSON, useMapEvents, Marker, Popup} from "react-leaflet";
// import {useNavigate} from "react-router-dom";
// import {isEmpty} from "../utils/common.helpers.tsx";
// import {Box, Group, ScrollArea, Slider, Switch} from "@mantine/core";
// import chroma from 'chroma-js';
// import Papa from "papaparse";
// import L from 'leaflet';
// import {useDataService} from "../hooks/useDataService.tsx";
// import {useStatsService} from "../hooks/useStatsService.tsx";
//
// const position = {
//     coords: [58.71692230040431, 25.29367844509054],
//     zoom: 8
// };
//
// const csvData = `
// EAA.2804.1.3,16.03.1889,Lääne > Vormsi > Vormsi,59.0048911,23.2623938,lõõts
// EAA.2532.1.4,13.04.1887,Järva > Türi > Särevere,58.7899151,25.4273404,lõõts
// EAA.3112.1.2,18.11.1863,Tartu > Kodavere > Ranna,58.7060343,27.1371438,lõõts
// EAA.1110.1.7,21.01.1877,Tartu > Kodavere > Alatskivi,58.599419,27.1326463,mõlemad
// EAA.2611.1.3,31.01.1890,Lääne > Ridala > Parila,58.867949,23.6161358,lõõts
// EAA.2611.1.3,07.02.1890,Lääne > Ridala > Parila,58.867949,23.6161358,täpsustamata
// EAA.3071.1.17,27.08.1888,Harju > Hageri > Kohila,59.1595187,24.6847315,lõõts
// EAA.3289.1.1,30.05.1869,Tartu > Võnnu > Kiidjärve,58.2847579,27.0492617,lõõts
// EAA.2826.1.1,30.01.1878,Lääne > Ridala > Kiltsi,58.9190918,23.5046883,lõõts
// EAA.2827.1.2,18.12.1871,Lääne > Pühalepa > Kärdla,58.9987098,22.7411776,lõõts
// EAA.1107.1.2,04.09.1887,Lääne > Ridala > Mäemõisa,58.8304047,23.5812548,lõõts
// EAA.1134.1.8,18.02.1877,Tartu > Torma > Avinurme,58.9877246,26.8672142,lõõts
// EAA.3071.1.9,17.09.1888,Harju > Hageri > Kohila,59.1595187,24.6847315,lõõts
// EAA.2635.1.1,06.09.1882,Harju > Nissi > Vana-Riisipere,59.1064924,24.3157211,lõõts
// EAA.2646.1.14,25.10.1885,Harju > Keila > Keila,59.3108007,24.4157526,lõõts
// EAA.1143.1.4,07.12.1879,Võru > Kanepi > Krootuse,58.0695211,26.8450982,mõlemad
// EAA.2600.1.4,28.08.1886,Lääne > Martna > Martna,58.8630755,23.8094441,lõõts
// EAA.3373.1.7,20.04.1879,Võru > Urvaste > Linnamäe,57.8755143,26.7124012,lõõts
// EAA.2635.1.8,18.02.1870,Harju > Nissi > Vana-Riisipere,59.1064924,24.3157211,lõõts
// EAA.3990.1.16,15.10.1875,Volmari > Rujiena > Laatre,57.8964007,25.3381039,harmoonika
// EAA.3990.1.16,23.10.1875,Volmari > Rujiena > Laatre,57.8964007,25.3381039,täpsustamata
// EAA.3537.1.2,01.12.1867,Viljandi > Pilistvere > Kõo,58.6625393,25.7307616,lõõts
// EAA.2635.1.9,07.11.1880,Harju > Nissi > Vana-Riisipere,59.1064924,24.3157211,lõõts
// EAA.1104.1.2,02.09.1885,Lääne > Ridala > Kiideva,58.783024,23.564169,lõõts
// EAA.2600.1.3,8.10.1874,Lääne > Martna > Martna,58.8630755,23.8094441,lõõts
// EAA.2810.1.3,03.05.1886,Lääne > Kullamaa > Liivi,58.8270291,23.9622389,lõõts
// EAA.2644.1.6,05.08.1886,Harju > Keila > Saue,59.3199675,24.5536923,lõõts
// EAA.2810.1.3,22.04.1889,Lääne > Kullamaa > Liivi,58.8270291,23.9622389,lõõts
// EAA.3113.2.196,12.11.1874,Tartu > Otepää > Pühajärve,58.0451398,26.4490863,lõõts
// EAA.1153.1.6,1889,Pärnu > Vändra > Uue-Vändra,58.6507844,25.0314543,lõõts
// EAA.3071.1.8,09.11.1874,Harju > Hageri > Kohila,59.1595187,24.6847315,täpsustamata
// EAA.3298.1.5,20.05.1883,Tartu > Võnnu > Kriimani,58.2762452,26.9648637,lõõts
// EAA.3388.1.1,01.06.1868,Võru > Põlva > Vana-Koiola,57.960036,27.0685874,lõõts
// EAA.3369.1.7,02.11.1887,Võru > Räpina > Kahkva,58.1011791,27.4583677,harmoonika
// EAA.3257.1.3,13.08.1882,Tartu > Võnnu > Ahja,58.2031576,27.0824851,harmoonika
// EAA.3257.1.3,21.01.1883,Tartu > Võnnu > Ahja,58.2031576,27.0824851,harmoonika
// EAA.3257.1.3,12.11.1882,Tartu > Võnnu > Ahja,58.2031576,27.0824851,harmoonika
// EAA.3257.1.4,21.10.1888,Tartu > Võnnu > Ahja,58.2031576,27.0824851,harmoonika
// EAA.1144.1.1,03.09.1882,Võru > Vastseliina > Misso,57.7321859,27.269694,harmoonika
// EAA.3676.1.23,09.01.1886,Viljandi > Kõpu > Suure-Kõpu,58.3186111,25.3075,harmoonika
// EAA.1110.1.8,29.10.1881,Tartu > Kodavere > Alatskivi,58.599419,27.1326463,harmoonika
// EAA.3619.1.1,27.08.1881,Võru > Põlva > Kiuma,58.0363879,26.9500719,harmoonika
// EAA.1110.1.8,03.02.1878,Tartu > Kodavere > Alatskivi,58.599419,27.1326463,harmoonika
// EAA.3300.1.20,26.11.1883,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.1110.1.8,24.02.1883,Tartu > Kodavere > Alatskivi,58.599419,27.1326463,harmoonika
// EAA.3369.1.3,07.04.1880,Võru > Räpina > Kahkva,58.1011791,27.4583677,harmoonika
// EAA.3369.1.3,10.10.1880,Võru > Räpina > Kahkva,58.1011791,27.4583677,harmoonika
// EAA.3300.1.20,19.08.1883,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.3300.1.20,02.09.1883,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.3300.1.20,16.09.1883,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.2791.1.3,19.07.1880,Järva > Peetri > Vodja,58.9414244,25.8432063,harmoonika
// EAA.3619.1.1,17.10.1884,Võru > Põlva > Kiuma,58.0363879,26.9500719,harmoonika
// EAA.3389.1.3,12.01.1883,Võru > Põlva > Kähri,58.0169333,26.9679271,harmoonika
// EAA.3389.1.3,26.01.1883,Võru > Põlva > Kähri,58.0169333,26.9679271,harmoonika
// EAA.3373.1.7,25.05.1879,Võru > Urvaste > Linnamäe,57.8755143,26.7124012,harmoonika
// EAA.3990.1.16,15.10.1875,Volmari > Rujiena > Laatre,57.8964007,25.3381039,harmoonika
// EAA.3676.1.20,20.01.1883,Viljandi > Kõpu > Suure-Kõpu,58.3186111,25.3075,harmoonika
// EAA.2644.1.6,17.01.1890,Harju > Keila > Saue,59.3199675,24.5536923,harmoonika
// EAA.3113.2.196,19.10.1876,Tartu > Otepää > Pühajärve,58.0451398,26.4490863,harmoonika
// EAA.3381.1.12,04.03.1887,Võru > Põlva > Võru,58.0507586,27.0593536,harmoonika
// EAA.2644.1.6,02.12.1886,Harju > Keila > Saue,59.3199675,24.5536923,harmoonika
// EAA.3257.1.3,01.04.1883,Tartu > Võnnu > Ahja,58.2031576,27.0824851,harmoonika
// EAA.3257.1.3,05.08.1883,Tartu > Võnnu > Ahja,58.2031576,27.0824851,harmoonika
// EAA.3297.1.2,11.09.1878,Tartu > Kodavere > Kadrina,58.6929746,27.1459478,harmoonika
// EAA.3300.1.20,13.09.1885,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.3300.1.20,27.09.1885,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.3300.1.20,08.11.1885,Tartu > Võnnu > Sarakuste,58.3621146,26.9533759,harmoonika
// EAA.2646.1.13,01.09.1887,Harju > Keila > Keila,59.3108007,24.4157526,harmoonika
// EAA.1110.1.8,10.02.1883,Tartu > Kodavere > Alatskivi,58.599419,27.1326463,harmoonika
// EAA.1110.1.8,07.04.1883,Tartu > Kodavere > Alatskivi,58.599419,27.1326463,harmoonika
// EAA.3089.1.8,05.05.1888,Tartu > Kodavere > Pala,58.6929746,27.1459478,harmoonika
// EAA.3619.1.1,16.12.1881,Võru > Põlva > Kiuma,58.0363879,26.9500719,harmoonika
// EAA.3389.1.3,08.12.1882,Võru > Põlva > Kähri,58.0169333,26.9679271,harmoonika
// EAA.1149.1.10,06.06.1885,Pärnu > Tori > Sindi,58.401003,24.6521469,harmoonika
// EAA.1149.1.10,13.06.1885,Pärnu > Tori > Sindi,58.401003,24.6521469,harmoonika
// EAA.1090.1.3,13.05.1886,Harju > Keila > Harku,59.3850036,24.6011568,harmoonika
// EAA.4628.1.1,22.09.1883,Pärnu > Audru > Võlla,58.4146092,24.3218542,harmoonika
// EAA.3113.1.1,06.06.1889,Tartu > Otepää > Pühajärve,58.0451398,26.4490863,harmoonika
// EAA.3647.1.3,05.11.1886,Võru > Rõuge > Leevi,57.9448016,27.2280156,harmoonika
// EAA.3113.2.9,26.11.1885,Tartu > Otepää > Pühajärve,58.0451398,26.4490863,harmoonika
// EAA.2797.1.3,14.06.1874,Tartu > Nõo > Pangodi,58.1987033,26.585911,harmoonika
// EAA.2797.1.3,28.06.1874,Tartu > Nõo > Pangodi,58.1987033,26.585911,harmoonika
// EAA.2644.1.4,30.04.1876,Harju > Keila > Saue,59.3199675,24.5536923,lõõts
// EAA.4595.1.2,28.01.1885,Pärnu > Tõstamaa > Kihnu,58.1290155,23.9916402,lõõts
// EAA.2541.1.3,30.06.1871,Järva > Anna > Purdi,58.9902815,25.6064216,lõõts
// EAA.4595.1.2,16.12.1886,Pärnu > Tõstamaa > Kihnu,58.1290155,23.9916402,lõõts
// EAA.2635.1.8,22.01.1869,Harju > Nissi > Vana-Riisipere,59.1064924,24.3157211,lõõts
// EAA.2635.1.9,25.10.1876,Harju > Nissi > Vana-Riisipere,59.1064924,24.3157211,lõõts
// EAA.2646.1.10,05.01.1873,Keila,59.3108007,24.4157526,lõõts
// EAA.3321.1.34,16.02.1883,Viljandi > Kõpu > Puiatu,58.3544982,25.4223769,lõõts
// EAA.3321.1.35,07.01.1887,Viljandi > Kõpu > Puiatu,58.3544982,25.4223769,lõõts
// EAA.2600.1.83,10.09.1873,Lääne > Martna > Martna,58.8630755,23.8094441,lõõts
// EAA.4595.1.2,18.11.1874,Pärnu > Tõstamaa > Kihnu,58.1290155,23.9916402,lõõts
// EAA.2640.1.28,20.10.1884,Rae,59.3899006,24.8812265,lõõts
// EAA.2642.1.1,08.08.1877,Harju > Nissi > Vardi,59.1009975,24.3162259,lõõts
// EAA.2642.1.1,19.11.1879,Harju > Nissi > Vardi,59.1009975,24.3162259,lõõts
// EAA.2640.1.26,08.09.1875,Rae,59.3899006,24.8812265,lõõts
// EAA.2640.1.26,22.09.1875,Rae,59.3899006,24.8812265,lõõts
// `;
//
//
// interface LocationData {
//     hierarchy: string;
//     lat: number;
//     lng: number;
//     name: string;
// }
//
//
// interface MapOptions {
//     showLabels: boolean;
//     showCounts: boolean;
//     asHeatMap: boolean;
//     heatIntensity: number;
//     textSize: number;
// }
//
// const DefaultOptions: MapOptions = {
//     showLabels: true,
//     showCounts: true,
//     asHeatMap: true,
//     heatIntensity: 0.5,
//     textSize: 10,
// }
//
// const getIcon = (color: string) => {
//     return  L.icon({
//         iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
//         iconSize: [25, 41], // size of the icon
//         iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
//         popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
//     })
// }
//
// const ParishMap: React.FC = () => {
//
//     const mapContainerRef = useRef<any>(null);
//     const geoJsonLayerRef = useRef<any>(null);
//
//     const [stats, setStats] = useState<RecordingMap<string, number>>();
//     const [geoData, setGeoData] = useState<any>(null);
//     const [max, setMax] = useState<number>(0);
//
//     const [mapOptions, setMapOptions] = useState<MapOptions>(DefaultOptions);
//
//     const {fetchStats} = useStatsService();
//     const navigate = useNavigate();
//
//     const MapEventHandler = () => {
//         useMapEvents({
//             zoomend: () => {
//                 const map = mapContainerRef.current;
//                 if (map) {
//                     setMapOptions({...mapOptions, textSize: Math.floor(map.getZoom() * 1.5)})
//                 }
//             }
//         });
//         return null;
//     };
//
//     const geoJsonStyle = {
//         fontFamily: "Monospace",
//         color: "#333",
//         weight: 2,
//         fillOpacity: 0.2,
//         interactive: true,
//     };
//
//     const geoJsonKey =`geo-${mapOptions.showLabels}-${mapOptions.showCounts}-${mapOptions.asHeatMap}-${mapOptions.heatIntensity}-${mapOptions.textSize}`
//
//     useEffect(() => {
//         if (isEmpty(stats)) {
//             return;
//         }
//         fetch(`/maps/kihelkonnad.json`)
//             .then((response) => response.json())
//             .then((data) => setGeoData(data));
//     }, [stats]);
//
//     const [locations, setLocations] = useState<LocationData[]>([]);
//
//
//
//     useEffect(() => {
//         fetchStats("Heliarhiiv - Latest.csv", "location", true )
//             .then(setStats)
//
//     }, []);
//
//     // useEffect(() => {
//     //
//     //     fetch("maps/courts2.csv")
//     //         .then(() => {
//     //
//     //         })
//     //
//     //     Papa.parse(csvData, {
//     //         header: false,
//     //         skipEmptyLines: true,
//     //         complete: (results) => {
//     //             const parsedData = results.data.map((row: any) => ({
//     //                 hierarchy: row[2],
//     //                 lat: parseFloat(row[3]) + Math.random()*0.01,
//     //                 lng: parseFloat(row[4]) +Math.random()*0.01,
//     //                 name: row[5],
//     //             }) as LocationData);
//     //             setLocations(parsedData);
//     //         },
//     //     });
//     // }, []);
//
//     const onEachFeature = (feature: any, layer: any) => {
//         if (feature.properties) {
//             const location = feature.properties.KIHELKOND;
//
//             // @ts-ignore
//             const count = stats[`${location}`] || 0;
//
//             let color = "#999";
//             if (mapOptions.asHeatMap) {
//                 const scale = chroma.scale(['#FFE45E', '#9C0000']).domain([0, max * (1 - mapOptions.heatIntensity)]);
//                 color = scale(count).hex();
//             }
//
//             const tooltipContent = `
//                 <div style="text-align: center;">
//                     <div style="font-size: ${mapOptions.textSize}px">${location?.replaceAll(" khk.", "")}</div>
//                     ${mapOptions.showCounts ? `<div style="font-size: ${mapOptions.textSize}px; font-weight: bold;">${count}</div>` : ''}
//                 </div>
//             `;
//
//             layer.setStyle({
//                 color: "#333",
//                 fillColor: color,
//                 weight: 2,
//                 fillOpacity: mapOptions.asHeatMap ? 1:  0.3,
//             });
//
//             layer.bindTooltip(
//                 tooltipContent,
//                 {permanent: true, direction: "center", className: "parish-label", interactive: true}
//             );
//
//             layer.on('click', () => {
//                 navigate(`/`, {state: {filters: [{field: "location", value: location}]}});
//             });
//
//             layer.on('mouseover', () => {
//                 layer.setStyle({
//                     fillColor: "orange",
//                 });
//             });
//
//             layer.on('mouseout', () => {
//                 layer.setStyle({
//                     fillColor: color,
//                 });
//             });
//         }
//     };
//
//     const colorMap = new RecordingMap([
//         ["lõõts", "blue"],
//         ["harmoonika", "red"],
//         ["mõlemad", "purple"],
//         ["täpsustamata", "black"],
//     ])
//
//     return (
//         <>
//             <Group px={"md"} mb={"md"}  style={{zIndex: 22}}>
//                 <Switch
//                     label="Näita statistikat"
//                     checked={mapOptions.showCounts}
//                     onChange={event => setMapOptions({...mapOptions, showCounts: event.currentTarget.checked})}
//                 />
//
//                 <Switch
//                     label="As heat map"
//                     checked={mapOptions.asHeatMap}
//                     onChange={event => setMapOptions({...mapOptions, asHeatMap: event.currentTarget.checked})}
//                 />
//
//                 <Slider
//                     w={400}
//                     value={mapOptions.heatIntensity}
//                     min={0.1}
//                     max={0.9}
//                     step={0.1}
//                     onChange={v => setMapOptions({...mapOptions, heatIntensity: v})}
//                 />
//
//
//                 <Slider
//                     w={400}
//                     value={mapOptions.textSize}
//                     min={4}
//                     max={20}
//                     step={2}
//                     onChange={v => setMapOptions({...mapOptions, textSize: v})}
//                 />
//             </Group>
//             <ScrollArea>
//
//             <Box px={"md"} style={{zIndex: 2}}>
//                 <p>{JSON.stringify(mapOptions)}</p>
//                 <MapContainer
//                     ref={mapContainerRef}
//                     center={{lat: position.coords[0], lng: position.coords[1]}}
//                     zoom={position.zoom}
//                     style={{height: "100vh", width: "100%"}}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     {geoData && !isEmpty(stats) && (
//                         <GeoJSON
//                             key={geoJsonKey}
//                             ref={geoJsonLayerRef}
//                             data={geoData}
//                             style={geoJsonStyle}
//                             onEachFeature={onEachFeature}
//                         />
//                     )}
//
//                     {/*{locations.map((location, idx) => (*/}
//                     {/*    <Marker key={idx} position={[location.lat, location.lng]}*/}
//                     {/*            icon={getIcon(colorMap.get(location.name) || "yellow")}*/}
//                     {/*    >*/}
//                     {/*        <Popup>*/}
//                     {/*            {location.hierarchy}*/}
//                     {/*        </Popup>*/}
//                     {/*    </Marker>*/}
//                     {/*))}*/}
//
//                     <MapEventHandler/>
//                 </MapContainer>
//             </Box>
//             </ScrollArea>
//
//         </>
//
//     );
// }
//
// export default ParishMap;
