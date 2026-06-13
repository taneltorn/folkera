import React from 'react';
import {Button} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useTranslation} from "react-i18next";
import {FaPauseCircle, FaPlayCircle} from "react-icons/fa";

const Play: React.FC = () => {

    const {t} = useTranslation();
    const {
        track,
        play,
        pause, isPlaying
    } = useAudioPlayer();


    const handleClick = () => {
        if (isPlaying) {
            pause();
            return;
        }
        if (track) {
            play(track);
        }
    };

    return (
        <Button
            px={"xs"}
            title={t(`player.${isPlaying ? "pause" : "play"}`)}
            size={"md"}
            radius={"xl"}
            variant={"transparent"}
            onClick={handleClick}
        >
            {isPlaying
                ? <FaPauseCircle size={40}/>
                : <FaPlayCircle size={40}/>}
        </Button>
    );
}

export default Play;
