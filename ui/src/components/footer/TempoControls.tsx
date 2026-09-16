import React, {useEffect, useState} from 'react';
import {Box, Group, Indicator, Menu, Slider} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import TempoAlert from "./TempoAlert.tsx";
import PlayerTempoButton from "./PlayerTempoButton.tsx";

interface Properties {
    playerRef: React.RefObject<any>;
    track?: Tune;
}

const TempoControls: React.FC<Properties> = ({playerRef, track}) => {

    const [tempo, setTempo] = useState<number>(1);

    useEffect(() => {
        // @ts-ignore
        if (playerRef.current?.audio?.current) {
            // @ts-ignore
            playerRef.current.audio.current.playbackRate = tempo;
        }
    }, [tempo, playerRef]);

    useEffect(() => {
        setTempo(1);
    }, [track]);

    return (
        <Menu>
            <Menu.Target>
                <Group>
                {track?.hideTempo
                    ? <Indicator offset={5} inline size={"compact-xs"} color={"yellow.3"} variant={"transparent"} processing label={<TempoAlert/>}>
                        <PlayerTempoButton tempo={tempo}/>
                    </Indicator>
                    : <PlayerTempoButton tempo={tempo}/>}
                </Group>
            </Menu.Target>
            <Menu.Dropdown>
                <Box px={"xl"} py={"xs"} mb={"md"}>
                    <Slider
                        w={150}
                        min={0.5}
                        max={1.5}
                        step={0.05}
                        value={tempo}
                        onChange={setTempo}
                        marks={[
                            {value: 0.5, label: "0.5x"},
                            {value: 1.0, label: "1x"},
                            {value: 1.5, label: "1.5x"},
                        ]}
                    />
                </Box>
            </Menu.Dropdown>
        </Menu>
    );
}

export default TempoControls;
