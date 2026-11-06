import React from "react";
import {ActionIcon, Group, Tooltip} from "@mantine/core";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {useTranslation} from "react-i18next";
import {MdPlaylistPlay, MdPlaylistRemove } from "react-icons/md";
import {Size} from "../../utils/constants.ts";

const PlayerAutoplayControls: React.FC = () => {

    const {t} = useTranslation();

    const {autoplay, toggleAutoplay} = useAudioPlayer();

    const AutoplayIcon = autoplay
        ? MdPlaylistRemove
        : MdPlaylistPlay;

    return (
        <Group gap="xs" wrap="nowrap">
            <Tooltip label={t(`button.${autoplay ? "disableAutoplay" : "autoplay"}`)}>
                <ActionIcon
                    color={autoplay ? "red" : "gray.3"}
                    variant="transparent"
                    size={"xl"}
                    onClick={toggleAutoplay}
                    aria-label={t(`button.${autoplay ? "disableAutoplay" : "autoplay"}`)}
                >
                    <AutoplayIcon size={Size.icon.LG}/>
                </ActionIcon>
            </Tooltip>
        </Group>
    );
};

export default PlayerAutoplayControls;