import chroma from "chroma-js";
import {ClusterPlot} from "../model/ClusterPlot.ts";
import {ColorScheme, ColorSchemeType} from "../model/ColorScheme.ts";
import {Recording} from "../model/Recording.ts";

export const RecordingTableFields = [
    "ref",
    "content",
    "tune",
    "dance",
    "year",
    "instrument",
    "performer",
    "parish",
    "county",
    "origin",
    "collector",
    "notes",
    "archive",
    "file",
    "duration",
    "comments",
    "trainset",
];

export const DefaultHiddenFields: Array<keyof Recording> = [
    "comments", "file", "origin", "dance", "duration", "trainset", "archive", "notes", "pid", "trainset", "datatype"
];

export const ItemsPerPageOptions = [10, 20, 50];

// Color schemes from chroma-js:
// 'OrRd', 'PuBu', 'BuPu', 'Oranges', 'BuGn', 'YlOrBr', 'YlGn', 'Reds', 'RdPu', 
// 'Greens', 'YlGnBu', 'Purples', 'GnBu', 'Greys', 'YlOrRd', 'PuRd', 'Blues', 'PuBuGn',
// 'Viridis', 'Spectral', 'RdYlGn', 'RdBu', 'PiYG', 'PRGn', 'RdYlBu', 'BrBG', 'RdGy', 'PuOr',
// 'Set2', 'Accent', 'Set1', 'Set3', 'Dark2', 'Paired', 'Pastel2', 'Pastel1'

export const ColorSchemes: ColorScheme[] = [
    {
        type: ColorSchemeType.SET1,
        scale: chroma.scale("Set1"),
        unidentified: chroma('gray').alpha(0.8).hex(),
    },
    {
        type: ColorSchemeType.MONOCHROMATIC,
        scale: chroma.scale(["#999", "#000"]),
        unidentified: chroma.scale("Reds").colors(10)[8],
    },
    {
        type: ColorSchemeType.VIRIDIS,
        scale: chroma.scale("Viridis"),
        unidentified: chroma('gray').alpha(0.8).hex(),
    },
];

export const CoverHunterDatasets = [
    "folkera",
    "3030",
];

export const ClusterPlots: ClusterPlot[] = [
    {
        name: "SHS100K + FolkERA",
        version: "v0.3",
        file: "cluster-data/pretrained_folk3859.json",
        works: 272,
        perfs: 3859,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "SHS100K + FolkERA",
        version: "v0.2",
        file: "cluster-data/pretrained_folk3030.json",
        works: 160,
        perfs: 3030,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "SHS100K + FolkERA",
        version: "v0.1",
        file: "cluster-data/pretrained_folk2400.json",
        works: 150,
        perfs: 2400,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "FolkERA",
        version: "v0.1",
        file: "cluster-data/folkera_v0.1.json",
        works: 150,
        perfs: 2400,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "SHS100K",
        version: "v0.1",
        file: "cluster-data/pretrained_v0.1.json",
        works: undefined,
        perfs: undefined,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "",
        version: "",
        file: "",
        works: undefined,
        perfs: undefined,
    },
    {
        name: "TEST: SHS100K + FolkERA",
        version: "v0.3",
        file: "cluster-data/eval_pretrained_folk3859.json",
        mAP: 0.802,
        rank1: 1.730,
        works: 241,
        perfs: 3182,
        testWorks: 30,
        testPerfs: 677,
        colorSchemeType: ColorSchemeType.SET1,
    },
    {
        name: "TEST: SHS100K + FolkERA",
        version: "v0.2",
        file: "cluster-data/eval_pretrained_folkera_v0.2.json",
        mAP: 0.720,
        rank1: 3.906,
        works: 130,
        perfs: 2550,
        testWorks: 30,
        testPerfs: 480,
        colorSchemeType: ColorSchemeType.SET1,
    },
    {
        name: "TEST: SHS100K + FolkERA",
        version: "v0.1",
        file: "cluster-data/eval_pretrained_folkera_v0.1.json",
        mAP: 0.704,
        rank1: 3.906,
        works: 120,
        perfs: 1920,
        testWorks: 30,
        testPerfs: 480,
        colorSchemeType: ColorSchemeType.SET1,
    },
    {
        name: "TEST: FolkERA",
        version: "v0.1",
        file: "cluster-data/eval_folkera_v0.1.json",
        mAP: 0.232,
        rank1: 8.923,
        works: 120,
        perfs: 1920,
        testWorks: 30,
        testPerfs: 480,
        colorSchemeType: ColorSchemeType.SET1,
    },
    {
        name: "TEST: SHS100K",
        version: "v0.2",
        file: "cluster-data/eval_pretrained_v0.2.json",
        mAP: 0.502,
        rank1: 3.69,
        works: undefined,
        perfs: undefined,
        testWorks: 30,
        testPerfs: 677,
        colorSchemeType: ColorSchemeType.SET1,
    },
    {
        name: "TEST: SHS100K",
        version: "v0.1",
        file: "cluster-data/eval_pretrained_v0.1.json",
        mAP: 0.508,
        rank1: 5.881,
        works: undefined,
        perfs: undefined,
        testWorks: 30,
        testPerfs: 480,
        colorSchemeType: ColorSchemeType.SET1,
    },
];

export const MarkerSymbols = [
    "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left", "triangle-right",
    "star", "hexagram", "pentagram", "hourglass", "bowtie",
];
