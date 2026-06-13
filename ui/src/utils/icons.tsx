import {ReactNode} from "react";
import {BsMusicNoteList} from "react-icons/bs";
import {Size} from "./constants.ts";
import {LuAudioLines} from "react-icons/lu";
import {IoMusicalNotes} from "react-icons/io5";

export const IconMap = new Map<string, ReactNode>([
    ["all", <BsMusicNoteList size={Size.icon.SM} />],
    ["AUDIO", <LuAudioLines size={Size.icon.SM} />],
    ["NOTATION", <IoMusicalNotes size={Size.icon.SM} />],
]);
