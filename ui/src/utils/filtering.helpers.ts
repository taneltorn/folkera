import {Recording} from "../model/Recording.ts";
import {Filter, SortDirection} from "../context/DataFilteringContext.tsx";
import {FieldState} from "./common.enums.ts";

export interface GroupedOption {
    group: string;
    items: string[];
}

export type FilteringOptions = {
    [K in keyof Omit<Recording, "ref">]: GroupedOption[];
}

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


export const filter = (data: Recording[], filters: Filter[]) => {

    const search = filters.find(f => f.field === "search")?.value?.toLowerCase().trim();
    const ref = filters.find(f => f.field === "ref")?.value?.toLowerCase().trim();
    const content = filters.find(f => f.field === "content")?.value?.toLowerCase().trim();
    const piece = filters.find(f => f.field === "piece")?.value?.trim();
    const archive = filters.find(f => f.field === "archive")?.value?.toLowerCase().trim();
    const notes = filters.find(f => f.field === "notes")?.value?.toLowerCase().trim();
    const comments = filters.find(f => f.field === "comments")?.value?.toLowerCase().trim();

    const melodies = filters
        .filter(f => f.field === "melody")
        .map(f => f.value.toLowerCase().trim());

    const years = filters
        .filter(f => f.field === "year")
        .map(f => f.value.trim()) || [];

    const instruments = filters
        .filter(f => f.field === "instrument")
        .map(f => f.value.toLowerCase().trim()) || [];

    const performers = filters
        .filter(f => f.field === "performer")
        .map(f => f.value.toLowerCase().trim()) || [];

    const locations = filters
        .filter(f => f.field === "location")
        .map(f => f.value.toLowerCase().trim()) || [];

    const collectors = filters
        .filter(f => f.field === "collector")
        .map(f => f.value.toLowerCase().trim()) || [];

    return data.filter(r =>
        isLike(r.ref, ref) &&
        isLike(r.content, content) &&
        isLike(r.notes, notes) &&
        isLike(r.comments, comments) &&
        is(r.piece, piece) &&
        isIn(r.melody, melodies) &&
        is(r.archive, archive) &&
        isBetween(r.year, years) &&
        isIn(r.instrument, instruments) &&
        isIn(r.performer, performers) &&
        isIn(r.collector, collectors) &&
        isIn(r.location, locations) &&
        (contains(r.ref, search)
            || contains(r.content, search)
            || contains(r.piece, search)
            || contains(r.melody, search)
            || contains(r.archive, search)
            || contains(r.year, search)
            || contains(r.instrument, search)
            || contains(r.performer, search)
            || contains(r.collector, search)
            || contains(r.location, search)
            || contains(r.notes, search)
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

export const is = (value: string | undefined, filterValue: string | undefined) => {
    if (!filterValue) {
        return true;
    }

    if (filterValue  === "_blank") {
        return !value;
    }

    if (filterValue  === "_not_blank") {
        return !!value;
    }


    return value?.toLowerCase() === filterValue.toLowerCase();
}

export const isLike = (value: string | undefined, filterValue: string | undefined) => {
    if (!filterValue) {
        return true;
    }

    return value?.toLowerCase().includes(filterValue.toLowerCase());
}

export const isIn = (value: string | undefined, filters: string[]) => {
    if (!filters.length) {
        return true;
    }
    if(filters[0] === "_blank") {
        return !value;
    }
    if(filters[0] === "_not_blank") {
        return !!value;
    }


    if (!value) {
        return false;
    }

    return filters.some(filter => {
        if (!filter.includes("<")) {
            const fieldValues = value.toLowerCase().split(/[,<]+/).map(v => v.trim());
            return filters.some(f => fieldValues.includes(f));
        }
        return value.toLowerCase().includes(filter.toLowerCase())
    });
}

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