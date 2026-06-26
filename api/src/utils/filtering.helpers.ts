import {FieldState} from "../model/FieldState";
import {Filter} from "../model/Filter";
import {GroupedOption} from "../model/GroupedOption";
import {SortDirection} from "../model/Pagination";
import {Tune} from "../model/Tune";
import {Operation} from "../model/Operation";

const searchableFields: (keyof Tune)[] = [
    "ref",
    "pid",
    "content",
    "melody",
    "dance",
    "year",
    "instrument",
    "performer",
    "collector",
    "parish",
    "county",
    "origin",
    "notes",
    "audio",
    "notation",
    "notationRef",
    "audioRef",
    "comments",
];

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

export const withBooleanOptions = (options: GroupedOption[]): GroupedOption[] => {
    return [{group: "", items: [FieldState.TRUE, FieldState.FALSE]}, ...options];
};

export const filter = (data: Tune[], filters?: Filter[]) => {
    if (!filters?.length) {
        return data;
    }

    const filtersByField = filters.reduce<Record<string, Filter[]>>((acc, filter) => {
        acc[filter.field] = acc[filter.field] || [];
        acc[filter.field].push(filter);
        return acc;
    }, {});

    const search = filtersByField.search?.[0]?.value?.toLowerCase().trim();
    const from = filtersByField.from?.[0]?.value?.trim();
    const to = filtersByField.to?.[0]?.value?.trim();

    const getFilters = (field: keyof Tune) => filtersByField[field] || [];

    return data.filter(tune =>
        isIn(tune.ref, getFilters("ref")) &&
        isIn(tune.notes, getFilters("notes")) &&
        isIn(tune.content, getFilters("content")) &&
        isIn(tune.year, getFilters("year")) &&
        isBetween(tune.year, from, to) &&
        isIn(tune.melody, getFilters("melody")) &&
        isIn(tune.instrument, getFilters("instrument")) &&
        isIn(tune.dance, getFilters("dance")) &&
        isIn(tune.performer, getFilters("performer")) &&
        isIn(tune.collector, getFilters("collector")) &&
        isIn(tune.parish, getFilters("parish")) &&
        isIn(tune.county, getFilters("county")) &&
        isIn(tune.origin, getFilters("origin")) &&
        isIn(tune.audio, getFilters("audio")) &&
        isIn(tune.audioRef, getFilters("audioRef")) &&
        isIn(tune.notationRef, getFilters("notationRef")) &&
        isIn(tune.musicxml, getFilters("musicxml")) &&
        isIn(tune.notation, getFilters("notation")) &&
        isIn(tune.comments, getFilters("comments")) &&
        isIn(tune.datatype, getFilters("datatype")) &&
        isIn(tune.trainset, getFilters("trainset")) &&
        isIn(tune.access, getFilters("access")) &&
        isBoolean(tune.hideTimeSignature, getFilters("hideTimeSignature")) &&
        isBoolean(tune.hideTempo, getFilters("hideTempo")) &&
        isIn(tune.pid, getFilters("pid")) &&
        searchableFields.some(field => contains(tune[field], search))
    );
};

const contains = (value: unknown, search: string | undefined) => {
    if (!search) {
        return true;
    }
    if (value == null) {
        return false;
    }
    return String(value).toLowerCase().includes(search);
};

const isBetween = (value: string, from?: string, to?: string): boolean => {
    if (!from && !to) return true;
    return isWithinRange(value, Number.parseInt(from) || Number.MIN_SAFE_INTEGER, Number.parseInt(to) || Number.MAX_SAFE_INTEGER);
};

const isWithinRange = (value: string | undefined, from: number, to: number): boolean => {
    if (!value) return false;

    const [minRaw, maxRaw] = value.includes("-")
        ? value.split("-").map(it => Number.parseInt(it.trim(), 10))
        : [Number.parseInt(value.trim(), 10), Number.parseInt(value.trim(), 10)];

    if (Number.isNaN(minRaw) || Number.isNaN(maxRaw)) {
        return false;
    }

    return maxRaw >= from && minRaw <= to;
};

const isBoolean = (value: boolean, filters: Filter[]): boolean => {
    if (filters.length === 0) return true;

    const filterValue = filters[0].value === "true";

    return filterValue === !!value;
}

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

        if (typeof fieldA === "string" && typeof fieldB === "string") {
            return direction === SortDirection.ASC ? fieldA.localeCompare(fieldB, "et") : fieldB.localeCompare(fieldA, "et");
        }

        return 0;
    });
};