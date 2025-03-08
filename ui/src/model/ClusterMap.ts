import {ColorScheme} from "./ColorScheme.ts";

export interface ClusterMap {
    name: string;
    file: string;
    mAP?: number;
    rank1?: number;
    defaultColorScheme?: ColorScheme;
    newWorks?: string[];
    
}