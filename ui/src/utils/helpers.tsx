import {Filter} from "../model/Filter.ts";
import {Tune} from "../model/Tune.ts";
import {TFunction} from "i18next";
import {DistanceBreakpoint} from "../model/DistanceBreakpoint.ts";

export const isEmpty = (object: any) => {
    return !object || Object.keys(object).length === 0 || object.length === 0;
}

export const fullRef = (tune: Tune): string => {
    return `${tune.ref} < ${tune.parish} ₋ ${truncate(tune.collector, 30)} < ${truncate(tune.performer, 30)} (${tune.year})`;
}

export const contentRef = (tune: Tune): string => {
    return `${truncate(tune.content, 50)} < ${tune.parish} < ${truncate(tune.performer, 30)} (${tune.year})`;
}

export const truncate = (text: string | undefined, limit: number = 25): string => {
    return text && text.length > limit ? text.slice(0, limit) + "..." : text || "";
}

export const urlify = (filters?: Filter[]): Record<string, string> => {
    if (!filters) {
        return {};
    }
    return filters.reduce((acc, {field, value, type}) => {
        const formattedValue = type ? `${value}:${type}` : value;
        // @ts-ignore
        acc[field] = acc[field]
            ? `${acc[field]};${formattedValue}`
            : formattedValue;
        return acc;
    }, {} as Record<string, string>);
};

export const generateFileName = (basename: string, filters?: Filter[]) => {
    return filters && filters.length > 0
        ? `${basename}_` + filters.map(f => f.value).join("_").replace(".", "").replace(" / ", "_") + ".csv"
        : `${basename}.csv`;
}

export const generateFilterName = (filter: Filter, t: TFunction): string => {
    const field = t(`tune.${filter.field}`);
    const matchType = ["exact", "not_contains", "from", "to"].includes(filter.type as string)
        ? ` (${t("filtering." + filter.type)})`.toLowerCase()
        : "";
    return `${field}${matchType}: ${filter.value}`;
}

export const distanceToColor = (distance: number | undefined): string => {
    if (!distance || distance >= DistanceBreakpoint.VERY_HIGH) {
        return "red";
    }
    if (distance >= DistanceBreakpoint.HIGH) {
        return "orange.7";
    }
    if (distance >= DistanceBreakpoint.MEDIUM) {
        return "yellow";
    }
    if (distance >= DistanceBreakpoint.LOW) {
        return "green.8";
    }
    return "green";
}

export const distanceToLabel = (distance: number | undefined): string => {
    if (!distance || distance >= DistanceBreakpoint.VERY_HIGH) {
        return "veryLow";
    }
    if (distance >= DistanceBreakpoint.HIGH) {
        return "low";
    }
    if (distance >= DistanceBreakpoint.MEDIUM) {
        return "medium";
    }
    if (distance >= DistanceBreakpoint.LOW) {
        return "high";
    }
    return "veryHigh";
}

export const parseDistances = (raw: string): Record<string, number> => {
    return raw
        .split(";")
        .filter(Boolean)
        .reduce<Record<string, number>>((acc, pair) => {
            const [id, value] = pair.split(":");
            acc[id] = Number(value);
            return acc;
        }, {});
};

export const stringifyDistances = (distances: Record<string, number>): string => {
    return Object.entries(distances)
        .map(([id, value]) => `${id}:${value}`)
        .join(";");
};