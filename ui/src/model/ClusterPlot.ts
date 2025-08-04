import {ColorSchemeType} from "./ColorScheme.ts";

export interface ClusterPlot {
    name: string;
    version: string;
    file: string;
    mAP?: number;
    rank1?: number;
    works: number | undefined;
    perfs: number | undefined;
    testWorks?: number;
    testPerfs?: number;
    colorSchemeType?: ColorSchemeType;
    newWorks?: string[];
}