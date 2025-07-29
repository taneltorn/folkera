import {ColorScheme} from "./ColorScheme.ts";

export interface ClusterPlot {
    name: string;
    file: string;
    mAP?: number;
    rank1?: number;
    defaultColorScheme?: ColorScheme;
    newWorks?: string[];
}