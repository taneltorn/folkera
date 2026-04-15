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

export const isPlaybackEnabled = (tune: Tune, isUser: boolean | undefined) => {
    return !!(tune.access === "OPEN" || isUser);
}

export const getPlayButtonTitle = (tune: Tune, isUser: boolean | undefined, isPlaying: boolean, t: any) => {
    if (!tune.audio) {
        return t("page.tunes.table.audioNotFound");
    }
    if (!isPlaybackEnabled(tune, isUser)) {
        return t("page.tunes.table.accessDenied");
    }
    return t(`button.${isPlaying ? "stop" : "play"}`)
}