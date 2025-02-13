import {Filter} from "../../../domain/Filter.ts";

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
    return filters.reduce((acc, { field, value }) => {
        acc[field] = acc[field] ? `${acc[field]};${value}` : value;
        return acc;
    }, {} as Record<string, string>);
};

export  const generateFileName = (filters?: Filter[]) => {
    return filters && filters.length > 0
        ? "pillilood_" + filters.map(f => f.value).join("_").replace(".", "").replace(" / ", "_") + ".csv"
        : "pillilood.csv";
}
