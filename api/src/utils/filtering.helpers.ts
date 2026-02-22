import {FieldState} from "../model/FieldState";
import {Filter} from "../model/Filter";
import {GroupedOption} from "../model/GroupedOption";
import {SortDirection} from "../model/Pagination";
import {Tune} from "../model/Tune";
import {Operation} from "../model/Operation";

export const extractAndSort = (tunes: Tune[], field: keyof Tune, split?: string): GroupedOption[] => {
    const values = extractByField(tunes, field, split);
    return [{
        group: "\n",
        items: Array.from(new Set(values)).sort()
    }];
};

export const extractByField = (tunes: Tune[], fieldName: keyof Tune, split?: string): string[] => {
    return tunes
        ?.flatMap(tune => {
            const fieldValue = tune[fieldName] as string;
            if (!fieldValue) return [];
            return split
                ? fieldValue.split(split).map(value => value.trim())
                : [fieldValue.trim()];
        }).filter(Boolean);
};

export const withBlankOptions = (options: GroupedOption[]): GroupedOption[] => {
    return [{group: "", items: [FieldState.BLANK, FieldState.NOT_BLANK]}, ...options];
};

export const filter = (data: Tune[], filters?: Filter[]) => {
    if (!filters) {
        return data;
    }

    const search = filters.find(f => f.field === "search")?.value?.toLowerCase().trim();
    const from = filters.find(f => f.field === "from")?.value?.trim();
    const to = filters.find(f => f.field === "to")?.value?.trim();

    return data.filter(r =>
        isIn(r.ref, filters.filter(f => f.field === "ref")) &&
        isIn(r.notes, filters.filter(f => f.field === "notes")) &&
        isIn(r.content, filters.filter(f => f.field === "content")) &&
        isIn(r.year, filters.filter(f => f.field === "year")) &&
        isBetween(r.year, from, to) &&
        isIn(r.melody, filters.filter(f => f.field === "melody")) &&
        isIn(r.instrument, filters.filter(f => f.field === "instrument")) &&
        isIn(r.dance, filters.filter(f => f.field === "dance")) &&
        isIn(r.performer, filters.filter(f => f.field === "performer")) &&
        isIn(r.collector, filters.filter(f => f.field === "collector")) &&
        isIn(r.parish, filters.filter(f => f.field === "parish")) &&
        isIn(r.county, filters.filter(f => f.field === "county")) &&
        isIn(r.origin, filters.filter(f => f.field === "origin")) &&
        isIn(r.comments, filters.filter(f => f.field === "comments")) &&
        isIn(r.datatype, filters.filter(f => f.field === "datatype")) &&
        isIn(r.trainset, filters.filter(f => f.field === "trainset")) &&

        (contains(r.ref, search)
            || contains(r.pid, search)
            || contains(r.content, search)
            || contains(r.melody, search)
            || contains(r.dance, search)
            || contains(r.year, search)
            || contains(r.instrument, search)
            || contains(r.performer, search)
            || contains(r.collector, search)
            || contains(r.parish, search)
            || contains(r.county, search)
            || contains(r.origin, search)
            || contains(r.notes, search)
            || contains(r.audio, search)
            || contains(r.notation, search)
            || contains(r.notationRef, search)
            || contains(r.audioRef, search)
            || contains(r.comments, search)
        )
    );
}

const contains = (value: string | undefined, search: string | undefined) => {
    if (!search) {
        return true;
    }

    return value?.toLowerCase().includes(search);
}

const isBetween = (value: string, from?: string, to?: string): boolean => {
    if (!from && !to) return true;
    return isWithinRange(value, Number.parseInt(from) || Number.MIN_SAFE_INTEGER, Number.parseInt(to) || Number.MAX_SAFE_INTEGER);
};

const isWithinRange = (value: string, from: number, to: number): boolean => {
    const [min, max] = value.includes("-")
        ? value.split("-").map(it => Number.parseInt(it.trim()))
        : [Number.parseInt(value.trim()), Number.parseInt(value.trim())];
    return max >= from && max <= to || min >= from && min <= to;
};

export const isIn = (value: string | undefined, filters: Filter[]): boolean => {
    if (filters.length === 0) return true;

    if (filters.some(f => f.type === "blank")) return !value;
    if (filters.some(f => f.type === "not_blank")) return !!value;

    if (!value) return false;

    const operation = filters.some(f => ["contains_all", "not_contains"].includes(f.type))
        ? Operation.AND
        : Operation.OR;
    
    const match = (f: Filter) =>
        f.type === "exact"
            ? value.toLowerCase() === f.value.toLowerCase()
            : f.type === "not_contains" ? !value.toLowerCase().includes(f.value.toLowerCase()) : value.toLowerCase().includes(f.value.toLowerCase());

    return operation === Operation.OR
        ? filters.some(match)
        : filters.every(match);
};


export const sortByField = (
    data: Tune[],
    field: keyof Tune = "order",
    direction: SortDirection = SortDirection.ASC
): Tune[] => {
    return [...data].sort((a, b) => {
        const fieldA = a[field];
        const fieldB = b[field];

        if (fieldA === undefined || fieldB === undefined) {
            return 0;
        }
        //
        // if (field === "order") {
        //     const a = parseInt(`${fieldA}`);
        //     const b = parseInt(`${fieldB}`);
        //
        //     return direction === SortDirection.ASC ? a - b : b - a;
        // }

        if (typeof fieldA === "string" && typeof fieldB === "string") {
            return direction === SortDirection.ASC ? fieldA.localeCompare(fieldB, "et") : fieldB.localeCompare(fieldA, "et");
        }

        return 0;
    });
};