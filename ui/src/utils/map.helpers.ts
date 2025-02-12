import {MapOptions} from "../model/MapOptions.ts";

export const DefaultMapOptions: MapOptions = {
    showLabels: true,
    showCounts: true,
    asHeatMap: true,
    heatIntensity: 0.4,
    textSize: 12,
    position: {
        coords: [58.61692230040431, 25.29367844509054],
        zoom: 8
    }
}

export const GeoJsonStyle = {
    fontFamily: "Monospace",
    color: "#333",
    weight: 2,
    interactive: true,
};
