import React from 'react';
import {Button, Tooltip} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {IoPlaySkipForward} from "react-icons/io5";
import {usePlayNext} from "../../hooks/usePlayNext.tsx";

const PlayNext: React.FC = () => {

    const {t} = useTranslation();
    const {playNext, hasNext} = usePlayNext();

    return (
        <Tooltip label={t("player.next")}>
            <Button
                size={"compact-md"}
                variant={"transparent"}
                disabled={!hasNext}
                onClick={() => void playNext()}
            >
                <IoPlaySkipForward size={Size.icon.MD}/>
            </Button>
        </Tooltip>
    );
}

export default PlayNext;
