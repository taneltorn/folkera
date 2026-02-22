import DataTransformer from "../transformers/DataTransformer";
import SplitByComma from "../transformers/SplitByComma";
import {Counties, Parishes} from "./common.lists";
import {GroupBy} from "../model/GroupBy";
import {Tune} from "../model/Tune";
import SplitBySemicolon from "../transformers/SplitBySemicolon";

const range = (start: number, end: number): number[] => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}

export const GroupByToDataTransformerMap = new Map<GroupBy, DataTransformer[]>([
    [GroupBy.MELODY, [new SplitBySemicolon()]],
    [GroupBy.INSTRUMENT, [new SplitByComma()]],
    [GroupBy.PARISH, [new SplitByComma()]],
    [GroupBy.PERFORMER, [new SplitByComma()]],
    [GroupBy.COUNTY, [new SplitByComma()]],
    [GroupBy.COLLECTOR, [new SplitByComma()]],
    [GroupBy.DANCE, [new SplitByComma()]],
]);

export const GroupByToListMap = new Map<GroupBy, string[]>([
    [GroupBy.YEAR, range(1874, 1999).map(n => `${n}`)],
    [GroupBy.PARISH, Parishes],
    [GroupBy.COUNTY, Counties],
]);

export const GroupByToFieldMap = new Map<GroupBy, keyof Tune>([
]);
