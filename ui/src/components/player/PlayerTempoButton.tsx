import React from 'react';
import {Button, Tooltip} from "@mantine/core";
import {IoIosSpeedometer} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";

interface Properties {
    tempo: number;
}

const PlayerTempoButton: React.FC<Properties> = ({tempo}) => {

    const {t} = useTranslation();

    return (
        <Tooltip label={t("player.tempo")}>
            <Button
                size={"compact-md"}
                color={tempo === 1 ? "dark.1" : "red"}
                variant={"transparent"}
            >
                <IoIosSpeedometer size={Size.icon.LG}/>
            </Button>
        </Tooltip>
    );
}

export default PlayerTempoButton;
