import React, {useEffect} from 'react';
import {Button} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {TbArrowBarToRight, TbRepeat, TbRepeatOff} from 'react-icons/tb';

const LoopControls: React.FC = () => {

    const {t} = useTranslation();
    const {
        track,
        playerRef,
        loopStart,
        setLoopStart,
        loopEnd,
        setLoopEnd,
        loopStage,
        setLoopStage,
        clearLoop
    } = useAudioPlayer();

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
            {loopStage === 0 && <TbRepeat size={Size.icon.MD}/>}
            {loopStage === 1 && <TbArrowBarToRight size={Size.icon.MD}/>}
            {loopStage === 2 && <TbRepeatOff size={Size.icon.MD}/>}
        </Button>
    );
}

export default LoopControls;
