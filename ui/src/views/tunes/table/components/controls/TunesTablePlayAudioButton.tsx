import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {PiSpeakerHigh} from "react-icons/pi";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../../model/Tune.ts";
import {IconSize} from "../../../../../utils/mappers.ts";

interface Properties {
    tune: Tune;
}


const TunesTablePlayAudioButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    const iconSize = IconSize.get("sm");

    return (
        <Button
            px={"xs"}
            size={"sm"}
            color={theme.colors.dark[9]}
            variant={"subtle"}
            title={tune.audio
                ? t(`button.${isPlaying ? "stop" : "play"}`)
                : t("view.tunes.table.audioNotFound")}
            disabled={!tune.audio}
            onClick={() => isPlaying && tune === track ? pause() : play(tune)}
        >
            {track?.audio === tune.audio && isPlaying
                ? <Audio
                    color={theme.colors.red[9]}
                    visible={isPlaying}
                    width={iconSize}
                />
                :
                <PiSpeakerHigh
                    color={theme.colors.dark[tune.audio ? 9 : 1]}
                    size={iconSize}
                />}
        </Button>
    );
}

export default TunesTablePlayAudioButton;
