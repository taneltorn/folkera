import React from 'react';
import {Button} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/constants.ts";

const PlayerCloseButton: React.FC = () => {

    const {setTrack} = useAudioPlayer();

    return (
        <Button
            px={0}
            variant={"transparent"}
            color={"dark"}
            onClick={() => setTrack(undefined)}
        >
            <IoIosClose size={Size.icon.LG}/>
        </Button>
    );
}

export default PlayerCloseButton;
