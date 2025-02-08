import {Scale} from "chroma-js";

export interface ColorScheme {
    name: string;
    identified: Scale;
    unidentified: string;
}