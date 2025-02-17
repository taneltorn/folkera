import chroma from "chroma-js";
import {ClusterMap} from "../model/ClusterMap";
import {ColorScheme} from "../model/ColorScheme.ts";

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
    "quality",
    "datatype",
    "kivike",
    "comments",
];

export const ItemsPerPageOptions = [10, 25, 50];

export const ColorSchemes: ColorScheme[] = [
    {
        name: "default",
        identified: chroma.scale("Set1"),
        unidentified: chroma.scale("Reds").colors(10)[8],
    },
    {
        name: "alternative",
        identified: chroma.scale(["#999", "#000"]),
        unidentified: chroma.scale("Reds").colors(10)[8],
    },
];

export const ClusterMaps: ClusterMap[] = [
    {
        name: "v1.2_pretrained_folk150",
        file: "cluster-data/v1.2_pretrained_folk150.json",
        defaultColorScheme: ColorSchemes[1],
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
    {name: "", file: ""},
    {
        name: "eval_covers80",
        file: "cluster-data/eval_covers80.json",
        defaultColorScheme: ColorSchemes[0],
        mAP: 0.120,
        rank1: 20.331
    },
    {
        name: "eval_reels100",
        file: "cluster-data/eval_reels100.json",
        defaultColorScheme: ColorSchemes[0],
        mAP: 0.105,
        rank1: 22.300
    },
    {
        name: "eval_folk150_trainset",
        file: "cluster-data/eval_folk150_trainset.json",
        defaultColorScheme: ColorSchemes[0],
        mAP: 0.232,
        rank1: 8.923
    },
    {
        name: "eval_folk150_trainset_alt",
        file: "cluster-data/eval_folk150_trainset_alt.json",
        defaultColorScheme: ColorSchemes[0],
        mAP: 0.248,
        rank1: 8.708
    },
    {
        name: "eval_pretrained_folk150_trainset",
        file: "cluster-data/eval_pretrained_folk150_trainset.json",
        defaultColorScheme: ColorSchemes[0],
        mAP: 0.704,
        rank1: 3.610
    },
    {
        name: "eval_pretrained_folk150_trainset_alt",
        file: "cluster-data/eval_pretrained_folk150_trainset_alt.json",
        defaultColorScheme: ColorSchemes[0],
        mAP: 0.701,
        rank1: 3.392
    },
];

export const MarkerSymbols = [
    "circle", "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left", "triangle-right",
    "star", "hexagram", "pentagram", "hourglass", "bowtie",
];

