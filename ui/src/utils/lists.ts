import chroma from "chroma-js";
import {ClusterPlot} from "../model/ClusterPlot.ts";
import {ColorScheme, ColorSchemeName} from "../model/ColorScheme.ts";
import { Recording } from "../model/Recording.ts";

export const RecordingTableFields = [
    "ref",
    "content",
    "tune",
    "dance",
    "year",
    "instrument",
    "performer",
    "parish",
    "origin",
    "collector",
    "notes",
    "archive",
    "file",
    "duration",
    "datatype",
    "comments",
];

export const DefaultHiddenFields: Array<keyof Recording> = [
  "comments", "file", "origin", "dance", "duration", "datatype", "archive", "notes"
];

export const ItemsPerPageOptions = [10, 20, 50];

export const ColorSchemes: ColorScheme[] = [
    {
        name: ColorSchemeName.DEFAULT,
        known: chroma.scale("Set1"),
        unidentified: chroma.scale("Reds").colors(10)[8],
    },
    {
        name: ColorSchemeName.ALT,
        known: chroma.scale(["#999", "#000"]),
        unidentified: chroma.scale("Reds").colors(10)[8],
    },
    {
        name: ColorSchemeName.ALT2,
        known: chroma.scale(["#999", "#000"]),
        unidentified: chroma.scale("Reds").colors(10)[8],
        correctlyIdentified: chroma.scale("Greens").colors(10)[6],
    },
];

export const ClusterPlots: ClusterPlot[] = [
    {
        name: "v1.3_pretrained_folk160",
        file: "cluster-data/v1.3_pretrained_folk160.json",
        defaultColorScheme: ColorSchemes[1],
        newWorks: ["TX", "TY", "TX2", "TY2"]

    },
    {
        name: "v1.2_pretrained_folk150",
        file: "cluster-data/v1.2_pretrained_folk150.json",
        defaultColorScheme: ColorSchemes[1],
        newWorks: ["TX", "TY"]
    },
    {
        name: "v1.1_pretrained_folk150",
        file: "cluster-data/v1.1_pretrained_folk150.json",
        defaultColorScheme: ColorSchemes[1],
    },
    {
        name: "v1.0_pretrained_folk150",
        file: "cluster-data/v1.0_pretrained_folk150.json",
        defaultColorScheme: ColorSchemes[1],
    },
    {
        name: "folk150",
        file: "cluster-data/folk150.json",
        defaultColorScheme: ColorSchemes[1],
    },
    {
        name: "pretrained",
        file: "cluster-data/pretrained.json",
        defaultColorScheme: ColorSchemes[1],
    },
    // {name: "", file: ""},
    // {
    //     name: "eval_covers80_folk150test",
    //     file: "cluster-data/eval_covers80_folk150_testset.json",
    //     defaultColorScheme: ColorSchemes[0],
    //     mAP: 0.120,
    //     rank1: 20.331
    // },
    // {
    //     name: "eval_reels100",
    //     file: "cluster-data/eval_reels100.json",
    //     defaultColorScheme: ColorSchemes[0],
    //     mAP: 0.105,
    //     rank1: 22.300
    // },
    // {
    //     name: "eval_folk150_trainset",
    //     file: "cluster-data/eval_folk150_trainset.json",
    //     defaultColorScheme: ColorSchemes[0],
    //     mAP: 0.232,
    //     rank1: 8.923
    // },
    // {
    //     name: "eval_folk160_trainset",
    //     file: "cluster-data/eval_folk160_trainset.json",
    //     defaultColorScheme: ColorSchemes[0],
    //     mAP: 0.262,
    //     rank1: 9.919
    // },
    // {
    //     name: "eval_pretrained_folk150_trainset",
    //     file: "cluster-data/eval_pretrained_folk150_trainset.json",
    //     defaultColorScheme: ColorSchemes[0],
    //     mAP: 0.704,
    //     rank1: 3.610
    // },
    // {
    //     name: "eval_pretrained_folk160_trainset",
    //     file: "cluster-data/eval_pretrained_folk160_trainset.json",
    //     defaultColorScheme: ColorSchemes[0],
    //     mAP: 0.720,
    //     rank1: 3.906
    // }
];

export const MarkerSymbols = [
    "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left", "triangle-right",
    "star", "hexagram", "pentagram", "hourglass", "bowtie",
];
