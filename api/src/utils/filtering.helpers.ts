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

const extract = (field: string, filters: Filter[], splitBy: string = ";"): string[] => {
    const values = filters
        .filter(f => f.field === field)
        .map(f => f.value.toLowerCase().trim()) || [];

    if (!splitBy) {
        return values;
    }
    return values.map(v => v.split(splitBy).map(v => v.trim())).flat();
}

export const filter = (data: Recording[], filters?: Filter[]) => {
    if (!filters) {
        return data;
    }

    const search = filters.find(f => f.field === "search")?.value?.toLowerCase().trim();
    const ref = filters.find(f => f.field === "ref")?.value?.toLowerCase().trim();
    const content = filters.find(f => f.field === "content")?.value?.toLowerCase().trim();
    const notes = filters.find(f => f.field === "notes")?.value?.toLowerCase().trim();

    return data.filter(r =>
        isLike(r.ref, ref) &&
        isLike(r.content, content) &&
        isLike(r.notes, notes) &&
        isBetween(r.year, extract("year", filters)) &&
        isIn(r.tune, filters.filter(f => f.field === "tune"), Operation.OR) &&
        isIn(r.archive, filters.filter(f => f.field === "archive"), Operation.OR) &&
        isIn(r.instrument, filters.filter(f => f.field === "instrument")) &&
        isIn(r.dance, filters.filter(f => f.field === "dance"), Operation.OR) &&
        isIn(r.datatype, filters.filter(f => f.field === "datatype"), Operation.OR) &&
        isIn(r.performer, filters.filter(f => f.field === "performer")) &&
        isIn(r.collector, filters.filter(f => f.field === "collector")) &&
        isIn(r.parish, filters.filter(f => f.field === "parish"), Operation.OR) &&
        isIn(r.origin, filters.filter(f => f.field === "origin"), Operation.OR) &&
        isIn(r.comments, filters.filter(f => f.field === "comments")) &&
        isIn(r.file, filters.filter(f => f.field === "file")) &&
        isIn(`${r.duration}`, filters.filter(f => f.field === "duration")) &&

        (contains(r.ref, search)
            || contains(r.content, search)
            || contains(r.tune, search)
            || contains(r.dance, search)
            || contains(r.archive, search)
            || contains(r.year, search)
            || contains(r.instrument, search)
            || contains(r.performer, search)
            || contains(r.collector, search)
            || contains(r.parish, search)
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

const isWithinRange = (num: number, range: string): boolean => {
    const [min, max] = range.includes("-")
        ? range.split("-").map(it => Number.parseInt(it.trim()))
        : [Number.parseInt(range.trim()), Number.parseInt(range.trim())];
    if (isNaN(min) || isNaN(max)) {
        return false;
    }
    return num >= min && num <= max;
};

export const isBetween = (value: string | undefined, filters: string[]) => {
    if (!filters.length) {
        return true;
    }
    if (!value) {
        return false;
    }

    const numValue = Number.parseInt(value.trim());
    if (isNaN(numValue)) {
        return false;
    }

    return filters.some(f => isWithinRange(numValue, f));
};

export const isLike = (value: string | undefined, filterValue: string | undefined) => {
    if (!filterValue) {
        return true;
    }

    return value?.toLowerCase().includes(filterValue.toLowerCase());
}

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
            return direction === SortDirection.ASC ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        }

        return 0;
    });
};