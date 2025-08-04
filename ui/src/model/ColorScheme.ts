import {Scale} from "chroma-js";

export interface ColorScheme {
    type: ColorSchemeType;
    scale: Scale;
    unidentified: string;
}

export enum ColorSchemeType {
    SET1 ,
    MONOCHROMATIC,
    VIRIDIS,
}