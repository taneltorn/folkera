import {Recording} from "../../../../model/Recording.ts";

const Transformers = new Map<keyof Recording, (value: any) => any>([
    ["datatype", (value: any) => value.toUpperCase()]
]);

export const transform = (value: any, field: keyof Recording): any => {
    if (Transformers.has(field)) {
        // @ts-ignore
        return Transformers.get(field)(value);
    }
    return value;
}