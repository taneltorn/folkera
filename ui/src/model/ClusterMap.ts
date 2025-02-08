import {ColorScheme} from "./ColorScheme.ts";

export interface ClusterMap {
    name: string;
    results: ClusterMapResult[];
    defaultColorScheme?: ColorScheme;
}

export interface ClusterMapResult {
    dataset: string;
    file: string;
    mAP?: number;
    rank1?: number;
}

