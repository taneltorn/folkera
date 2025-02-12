import DataTransformer from "../transformers/DataTransformer";
import SplitByComma from "../transformers/SplitByComma";
import ParishToCounty from "../transformers/ParishToCounty";
import {Recording} from "../../../domain/Recording";
import {GroupBy} from "../../../domain/GroupBy";

const range = (start: number, end: number): number[] => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}

export const GroupByToDataTransformerMap = new Map<GroupBy, DataTransformer[]>([
    [GroupBy.INSTRUMENT, [new SplitByComma()]],
    [GroupBy.PARISH, [new SplitByComma()]],
    [GroupBy.COUNTY, [new SplitByComma(), new ParishToCounty()]],
]);

export const GroupByToListMap = new Map<GroupBy, string[]>([
    [GroupBy.YEAR, range(1912, 1999).map(n => `${n}`)],
]);

export const GroupByToFieldMap = new Map<GroupBy, keyof Recording>([
    [GroupBy.COUNTY, "parish"],
]);
