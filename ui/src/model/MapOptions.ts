export interface MapOptions {
    showLabels: boolean;
    showCounts: boolean;
    asHeatMap: boolean;
    heatIntensity: number;
    textSize: number;
    position: {
        coords: number[];
        zoom: number;
    }
}
