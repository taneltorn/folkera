export interface MapOptions {
    type: MapType;
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

export enum MapType {
    PARISHES = "parishes",
    COUNTIES = "counties",
}
