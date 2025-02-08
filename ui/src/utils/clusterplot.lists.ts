import chroma from "chroma-js";
import {ClusterMap} from "../model/ClusterMap";
import {ColorScheme} from "../model/ColorScheme.ts";
import {TFunction} from "i18next";

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

export const Datasets: string[] = ["folkera", "folk150_testset"];

export const ClusterMaps: ClusterMap[] = [
    {
        name: "pretrained",
        defaultColorScheme: ColorSchemes[0],
        results: [
            {
                dataset: "folkera",
                file: "cluster-data/x-pretrained-folkera.json",
            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/pretrained-folk150_testset.json",
                mAP: 0.753,
                rank1: 3.24,
            },
        ]
    },
    {
        name: "covers80",
        defaultColorScheme: ColorSchemes[0],
        results: [
            {
                dataset: "folkera",
                file: "cluster-data/x-covers80-folkera.json",
            },
            {
                dataset: "folk150_testset",
                file: "cluster-data/x-covers80-folk150_testset.json",
                mAP: 0.753,
                rank1: 3.24,
            },
        ]
    },

];

export const MarkerSymbols = [
    "circle", "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left", "triangle-right",
    "star", "hexagram", "pentagram", "hourglass", "bowtie",
];

export const generateModelVersionOptions = (t: TFunction) => [
    {
        value: "pretrained",
        label: t("view.clusterMap.modelVersion.pretrained"),
    },
    {
        value: "covers80",
        label: t("view.clusterMap.modelVersion.covers80"),
    },
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
