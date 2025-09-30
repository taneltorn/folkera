import {Filter} from "../model/Filter.ts";
import {Recording} from "../model/Recording.ts";

export const isEmpty = (object: any) => {
    return !object || Object.keys(object).length === 0 || object.length === 0;
}

export const fullRef = (recording: Recording): string => {
    return `${recording.ref} < ${recording.parish} ₋ ${truncate(recording.collector, 30)} < ${truncate(recording.performer, 30)} (${recording.year})`;
}

export const contentRef = (recording: Recording): string => {
    return `${truncate(recording.content, 50)} < ${recording.parish} < ${truncate(recording.performer, 30)} (${recording.year})`;
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

export const similarityToOpacity = (similarity: number): number => {
    if (similarity > 90) return 1;
    if (similarity > 85) return 0.75;
    if (similarity > 80) return 0.6;
    if (similarity > 75) return 0.5;
    if (similarity > 70) return 0.4;
    return 0.3;
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
