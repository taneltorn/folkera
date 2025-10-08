import {FieldState} from "../model/FieldState";
import {Filter} from "../model/Filter";
import {GroupedOption} from "../model/GroupedOption";
import {SortDirection} from "../model/Pagination";
import {Recording} from "../model/Recording";
import {Operation} from "../model/Operation";

export const extractAndSort = (recordings: Recording[], field: keyof Recording, split?: string): GroupedOption[] => {
    const values = extractByField(recordings, field, split);
    return [{
        group: "\n",
        items: Array.from(new Set(values)).sort()
    }];
};

export const extractByField = (recordings: Recording[], fieldName: keyof Recording, split?: string): string[] => {

    return recordings
        ?.flatMap(recording => {
            const fieldValue = recording[fieldName] as string;
            if (!fieldValue) return [];
            return split
                ? fieldValue.split(split).map(value => value.trim())
                : [fieldValue.trim()];
        }).filter(Boolean);
};

export const withBlankOptions = (options: GroupedOption[]): GroupedOption[] => {
    return [{group: "", items: [FieldState.BLANK, FieldState.NOT_BLANK]}, ...options];
};

export const filter = (data: Recording[], filters?: Filter[]) => {
    if (!filters) {
        return data;
    }

    const search = filters.find(f => f.field === "search")?.value?.toLowerCase().trim();

    return data.filter(r =>
        isIn(r.ref, filters.filter(f => f.field === "ref"), Operation.OR) &&
        isIn(r.notes, filters.filter(f => f.field === "notes"), Operation.OR) &&
        isIn(r.content, filters.filter(f => f.field === "content"), Operation.OR) &&
        isBetween(r.year, filters.filter(f => f.field === "year")) &&
        isIn(r.tune, filters.filter(f => f.field === "tune"), Operation.OR) &&
        isIn(r.archive, filters.filter(f => f.field === "archive"), Operation.OR) &&
        isIn(r.instrument, filters.filter(f => f.field === "instrument")) &&
        isIn(r.dance, filters.filter(f => f.field === "dance"), Operation.OR) &&
        isIn(r.trainset, filters.filter(f => f.field === "trainset"), Operation.OR) &&
        isIn(r.performer, filters.filter(f => f.field === "performer")) &&
        isIn(r.collector, filters.filter(f => f.field === "collector")) &&
        isIn(r.parish, filters.filter(f => f.field === "parish"), Operation.OR) &&
        isIn(r.county, filters.filter(f => f.field === "county"), Operation.OR) &&
        isIn(r.origin, filters.filter(f => f.field === "origin"), Operation.OR) &&
        isIn(r.comments, filters.filter(f => f.field === "comments")) &&
        isIn(r.file, filters.filter(f => f.field === "file")) &&
        isIn(`${r.duration}`, filters.filter(f => f.field === "duration")) &&

        (contains(r.ref, search)
            || contains(r.pid, search)
            || contains(r.content, search)
            || contains(r.tune, search)
            || contains(r.dance, search)
            || contains(r.archive, search)
            || contains(r.year, search)
            || contains(r.instrument, search)
            || contains(r.performer, search)
            || contains(r.collector, search)
            || contains(r.parish, search)
            || contains(r.county, search)
            || contains(r.origin, search)
            || contains(r.notes, search)
            || contains(r.file, search)
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

const isBetween = (value: string, filters: Filter[]): boolean => {
    if (filters.length === 0) return true;

    if (filters.some(f => f.type === "blank")) return !value;
    if (filters.some(f => f.type === "not_blank")) return !!value;
    const exact = filters.find(f => f.type === "exact")?.value;

    const from = filters.find(f => f.type === "from")?.value;
    const to = filters.find(f => f.type === "to")?.value;

    const match = (f: Filter) =>
        f.type === "exact"
            ? value === exact
            : isWithinRange(value, Number.parseInt(from) || Number.MIN_SAFE_INTEGER, Number.parseInt(to) || Number.MAX_SAFE_INTEGER);

    return filters.some(match);
};


const isWithinRange = (value: string, from: number, to: number): boolean => {
    const [min, max] = value.includes("-")
        ? value.split("-").map(it => Number.parseInt(it.trim()))
        : [Number.parseInt(value.trim()), Number.parseInt(value.trim())];
    return max >= from && max <= to || min >= from && min <= to;
};

export const isIn = (value: string | undefined, filters: Filter[], operation?: Operation): boolean => {
    if (filters.length === 0) return true;

    if (filters.some(f => f.type === "blank")) return !value;
    if (filters.some(f => f.type === "not_blank")) return !!value;
    if (!value) return false;

    const match = (f: Filter) =>
        f.type === "exact"
            ? value.toLowerCase() === f.value.toLowerCase()
            : value.toLowerCase().includes(f.value.toLowerCase());

    return operation === Operation.OR
        ? filters.some(match)
        : filters.every(match);
};


export const sortByField = (
    data: Recording[],
    field: keyof Recording = "order",
    direction: SortDirection = SortDirection.ASC
): Recording[] => {
    return [...data].sort((a, b) => {
        const fieldA = a[field];
        const fieldB = b[field];

        if (fieldA === undefined || fieldB === undefined) {
            return 0;
        }

        if (field === "order") {
            const a = parseInt(`${fieldA}`);
            const b = parseInt(`${fieldB}`);

            return direction === SortDirection.ASC ? a - b : b - a;
        }

        if (typeof fieldA === "string" && typeof fieldB === "string") {
            return direction === SortDirection.ASC ? fieldA.localeCompare(fieldB, "et") : fieldB.localeCompare(fieldA, "et");
        }

        return 0;
    });
};