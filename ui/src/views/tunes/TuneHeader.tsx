import React from "react";
import {Tune} from "../../model/Tune.ts";
import {Group} from "@mantine/core";
import PlayAudioButton from "./table/components/controls/PlayAudioButton.tsx";
import TuneReference from "./TuneReference.tsx";
import NextTuneButton from "./components/controls/NextTuneButton.tsx";
import PreviousTuneButton from "./components/controls/PreviousTuneButton.tsx";

interface Properties {
    tune: Tune;
}

const TuneHeader: React.FC<Properties> = ({tune}) => {
    return (
            <Group justify={"space-between"} mb={"md"}>
                <Group wrap={"nowrap"}>
                    {tune.audio && <PlayAudioButton tune={tune}/>}
                    <TuneReference tune={tune}/>
                </Group>

                <Group gap={4} wrap={"nowrap"}>
                    <PreviousTuneButton tune={tune}/>
                    <NextTuneButton tune={tune}/>
                </Group>
            </Group>
    );
}

export default TuneHeader;
