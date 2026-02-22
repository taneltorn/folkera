import {Tune} from "../../../../model/Tune.ts";

const Transformers = new Map<keyof Tune, (value: any) => any>([
    ["trainset", (value: any) => value.toUpperCase()]
]);

export const transform = (value: any, field: keyof Tune): any => {
    if (Transformers.has(field)) {
        // @ts-ignore
        return Transformers.get(field)(value);
    }
    return value;
}