import {Recording} from "../../../domain/Recording.ts";

export enum GroupBy {
    GROUP_BY_YEAR = "groupByYear",
    GROUP_BY_INSTRUMENT = "groupByInstrument",
    GROUP_BY_PARISH = "groupByParish",
    GROUP_BY_PIECE = "groupByPiece",
}

export enum ChartType {
    BAR = "barChart",
    PIE = "pieChart",
}

// export interface StatsItem {
//     [key: string]: number;
// }

export interface StatsItem {
    key: string;
    value: number;
}

export interface MapStats {
    parishes: StatsItem[],
    counties: StatsItem[],
}

export interface StatsOptions {
    groupBy: string;
    groups?: string[];
    transformers?: string[];
    sort?: string;
}

export interface StatsRequest {
    data: Recording[];
    options: StatsOptions;
}