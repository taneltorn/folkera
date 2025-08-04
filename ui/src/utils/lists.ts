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
    "datatype",
    "comments",
];

export const DefaultHiddenFields: Array<keyof Recording> = [
    "comments", "file", "origin", "dance", "duration", "datatype", "archive", "notes"
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

export const ClusterPlots: ClusterPlot[] = [
    {
        name: "SHS100K + FolkERA",
        version: "v1.1",
        file: "cluster-data/shs100k_folkera_v1.1.json",
        works: 160,
        perfs: 3030,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "SHS100K + FolkERA",
        version: "v1.0",
        file: "cluster-data/shs100k_folkera_v1.0.json",
        works: 150,
        perfs: 2400,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "FolkERA",
        version: "v1.0",
        file: "cluster-data/folkera_v1.0.json",
        works: 150,
        perfs: 2400,
        colorSchemeType: ColorSchemeType.VIRIDIS,
    },
    {
        name: "SHS100K",
        version: "v1.0",
        file: "cluster-data/shs100k_v1.0.json",
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
        version: "v1.1",
        file: "cluster-data/shs100k_folkera_v1.1_eval.json",
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
        version: "v1.0",
        file: "cluster-data/shs100k_folkera_v1.0_eval.json",
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
        version: "v1.0",
        file: "cluster-data/folkera_v1.0_eval.json",
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
        version: "v1.0",
        file: "cluster-data/shs100k_v1.0_eval.json",
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
