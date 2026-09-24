import React from 'react';
import {Button, Tooltip} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {IoIosClose} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";

const PlayerCloseButton: React.FC = () => {

    const {t} = useTranslation();
    const {setTrack} = useAudioPlayer();

    return (
        <Tooltip label={t("player.close")}>
            <Button
                px={0}
                variant={"transparent"}
                color={"gray"}
                onClick={() => setTrack(undefined)}
            >
                <IoIosClose size={Size.icon.XL}/>
            </Button>
        </Tooltip>
    );
}

export default PlayerCloseButton;
