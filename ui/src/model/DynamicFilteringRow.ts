import {Tune} from "./Tune.ts";

export interface DynamicFilteringRow {
    filterKey: string;
    field: keyof Tune;
    autocomplete: boolean;
}