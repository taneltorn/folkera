import {Filter} from "../model/Filter.ts";

export const isEmpty = (object: any) => {
    return !object || Object.keys(object).length === 0 || object.length === 0;
}

export const truncate = (text: string | undefined, limit: number = 25): string => {
    return text && text.length > limit ? text.slice(0, limit) + "..." : text || "";
}

export const urlify = (filters?: Filter[]): Record<string, string> => {
    if (!filters) {
        return {};
    }
    return filters.reduce((acc, { field, value, type }) => {
        const formattedValue = type ? `${value}:${type}` : value;
        acc[field] = acc[field]
            ? `${acc[field]};${formattedValue}`
            : formattedValue;
        return acc;
    }, {} as Record<string, string>);
};

export const generateFileName = (filters?: Filter[]) => {
    return filters && filters.length > 0
        ? "pillilood_" + filters.map(f => f.value).join("_").replace(".", "").replace(" / ", "_") + ".csv"
        : "pillilood.csv";
}

export const distanceToSimilarity = (distance: number | undefined): number => {
    if (!distance) {
        return 0;
    }

    return Number((1 - distance) * 100);
}

export const similarityToColor = (distance: number | undefined): string => {
    if (!distance || distance < 75) {
        return "red";
    }
    if (distance < 79.5) {
        return "orange.7";
    }
    if (distance < 89.5) {
        return "yellow";
    }
    if (distance < 94.5) {
        return "green.8";
    }
    return "green";
}
