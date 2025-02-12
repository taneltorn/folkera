import chroma from "chroma-js";
import {ClusterMap} from "../model/ClusterMap";
import {ColorScheme} from "../model/ColorScheme.ts";
import {TFunction} from "i18next";

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

export const ItemsPerPageOptions = [10, 25, 100];

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

export const Datasets: string[] = ["folkera", "folk150", "folk150_testset"];

export const ClusterMaps: ClusterMap[] = [
    {
        name: "folk150_v0",
        results: [

            {
                dataset: "folkera",
                file: "cluster-data/folk150_v0-folkera.json",
            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/folk150_v0-folk150_testset.json",
            },
        ]
    },
    {
        name: "pretrained",
        results: [
            {
                dataset: "folkera",
                file: "cluster-data/pretrained-folkera.json",

            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/pretrained-folk150_testset.json",
                mAP: 0.507,
                rank1: 5.790,
            },
        ]
    },
    {
        name: "covers80",
        results: [
            {
                dataset: "folkera",
                file: "cluster-data/covers80-folkera.json",
            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/covers80-folk150_testset.json",
                mAP: 0.118,
                rank1: 23.408,
            },
        ]
    },
    {
        name: "reels100",
        results: [
            {
                dataset: "folkera",
                file: "cluster-data/reels100-folkera.json",
            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/reels100-folk150_testset.json",
                mAP: 0.130,
                rank1: 20.935,
            },
        ]
    },
    {
        name: "folk150_trainset",
        results: [
            {
                dataset: "folkera",
                file: "cluster-data/folk150_trainset-folkera.json",
            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/folk150_trainset-folk150_testset.json",
                mAP: 0.262,
                rank1: 10.231,
            },
        ]
    }

];

export const MarkerSymbols = [
    "circle", "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left", "triangle-right",
    "star", "hexagram", "pentagram", "hourglass", "bowtie",
];


export const generateDatasetOptions = (t: TFunction) => [
    {
        value: "folkera",
        label: t("view.clusterMap.dataset.folkera"),
    },
    {
        value: "folk150_testset",
        label: t("view.clusterMap.dataset.folk150_testset"),
    },
];


export const generateColorSchemeOptions = (t: TFunction) => [
    {
        value: "default",
        label: t("view.clusterMap.colorScheme.default"),
    },
    {
        value: "alternative",
        label: t("view.clusterMap.colorScheme.alternative"),
    },
];
