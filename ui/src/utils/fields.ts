import {Tune} from "../model/Tune.ts";

export interface TunesTableField {
    field: keyof Tune;
    sortField?: keyof Tune;
    type: "input" | "select";
    split?: string;
    technical?: boolean;
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
    {field: "notationRef", type: "select"},
    {field: "audioRef", type: "select"},
    {field: "access", type: "select"},
    {field: "datatype", type: "select"},
    {field: "audio", type: "select", technical: true},
    {field: "notation", type: "select", technical: true},
    {field: "musicxml", type: "select", technical: true},
    {field: "duration", type: "select", technical: true},
    {field: "trainset", type: "select", split: ",", technical: true},
    {field: "comments", type: "select", technical: true},
    {field: "order", type: "select", technical: true},
    {field: "flatLink", type: "select", technical: true},
    {field: "hideTimeSignature", type: "select", technical: true},
    {field: "hideTempo", type: "select", technical: true},
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