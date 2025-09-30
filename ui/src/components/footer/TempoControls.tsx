import React, {useEffect, useState} from 'react';
import {Box, Button, Menu, Slider} from "@mantine/core";
import {IoIosSpeedometer} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";

interface Properties {
    playerRef: React.RefObject<any>;
}

const TempoControls: React.FC<Properties> = ({playerRef}) => {

    const {t} = useTranslation();

    const [tempo, setTempo] = useState<number>(1);

    useEffect(() => {
        // @ts-ignore
        if (playerRef.current?.audio?.current) {
            // @ts-ignore
            playerRef.current.audio.current.playbackRate = tempo;
        }
    }, [tempo, playerRef]);
    
    return (
        <Menu>
            <Menu.Target>
                <Button
                    title={t("player.tempo")}
                    size={"compact-md"}
                    color={tempo === 1 ? "dark.1" : "red"}
                    variant={"transparent"}
                >
                    <IoIosSpeedometer size={Size.icon.LG}/>
                </Button>
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
