import React, {useEffect, useState} from 'react';
import {Button} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {TbArrowBarToRight, TbRepeat, TbRepeatOff} from 'react-icons/tb';

const LoopControls: React.FC = () => {

    const {t} = useTranslation();
    const {track, playerRef} = useAudioPlayer();

    const [loopStage, setLoopStage] = useState<0 | 1 | 2>(0);
    const [loopStart, setLoopStart] = useState<number | null>(null);
    const [loopEnd, setLoopEnd] = useState<number | null>(null);

    const handleLoopClick = () => {
        const audio = playerRef.current?.audio?.current;
        if (!audio) return;

        if (loopStage === 0) {
            setLoopStart(audio.currentTime);
            setLoopStage(1);
        } else if (loopStage === 1) {
            setLoopEnd(audio.currentTime);
            setLoopStage(2);
        } else {
            clearLoop();
        }
    };

    const clearLoop = () => {
        setLoopStart(null);
        setLoopEnd(null);
        setLoopStage(0);
    }

    useEffect(() => {
        clearLoop();
    }, [track]);

    useEffect(() => {
        const audio = playerRef.current?.audio?.current;
        if (!audio || loopStart === null || loopEnd === null) return;

        const onTimeUpdate = () => {
            if (audio.currentTime >= loopEnd!) {
                audio.currentTime = loopStart!;
            }
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        return () => audio.removeEventListener("timeupdate", onTimeUpdate);
    }, [loopStart, loopEnd, playerRef]);


    return (
        <Button
            color={loopStage === 0 ? "dark.1" : "red"}
            title={t(`player.loop.${loopStage}`)}
            size={"compact-md"}
            variant={"transparent"}
            onClick={handleLoopClick}
        >
            {loopStage === 0 && <TbRepeatOff size={Size.icon.MD}/>}
            {loopStage === 1 && <TbArrowBarToRight size={Size.icon.MD}/>}
            {loopStage === 2 && <TbRepeat size={Size.icon.MD}/>}
        </Button>
    );
}

export default LoopControls;
