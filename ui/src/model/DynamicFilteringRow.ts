import {Tune} from "./Tune.ts";

export interface DynamicFilteringRow {
    id: string;
    filterKey: string;
    field: keyof Tune;
    autocomplete: boolean;
}