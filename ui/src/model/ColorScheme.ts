import {Scale} from "chroma-js";

export interface ColorScheme {
    name: ColorSchemeName;
    known: Scale;
    unidentified: string;
    correctlyIdentified?: string;
}

export enum ColorSchemeName {
    DEFAULT = "default",
    ALT = "alt",
    ALT2 = "alt2"
}