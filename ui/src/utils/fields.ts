import {Tune} from "../model/Tune.ts";

export interface TunesTableField {
    field: keyof Tune;
    sortField?: keyof Tune;
    type: "input" | "select";
    split?: string;
}

export const fields: TunesTableField[] = [
    {field: "ref", sortField: "order", type: "input"},
    {field: "content", type: "input"},
    {field: "melody", type: "select", split: ";"},
    {field: "year", type: "select", split: ","},
    {field: "instrument", type: "select", split: ","},
    {field: "performer", type: "select", split: ","},
    {field: "parish", type: "select", split: ","},
    {field: "county", type: "select", split: ","},
    {field: "origin", type: "select", split: ","},
    {field: "collector", type: "select", split: ","},
    {field: "notes", type: "select"},
    {field: "dance", type: "select", split: ","},
    {field: "notationRef", type: "input"},
    {field: "audioRef", type: "input"},
];

export const technicalFields: TunesTableField[] = [
    {field: "datatype", type: "select"},
    {field: "audio", type: "select"},
    {field: "notation", type: "select"},
    {field: "musicxml", type: "select"},
    {field: "duration", type: "select"},
    {field: "trainset", type: "select", split: ","},
    {field: "comments", type: "select"},
    {field: "access", type: "select"},
    {field: "order", type: "input"},
    {field: "hideTimeSignature", type: "input"},
];

export const AutocompleteFields = ["melody", "dance", "instrument", "performer", "collector", "parish", "county", "origin"];

export const DynamicFieldTypes = [
    "melody",
    "year",
    "instrument",
    "performer",
    "collector",
    "parish",
    "county",
    "origin",
    "dance",
    "audio",
    "notation",
    "musicxml",
];