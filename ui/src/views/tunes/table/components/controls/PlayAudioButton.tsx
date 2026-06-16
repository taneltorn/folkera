import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../../model/Tune.ts";
import {MdPauseCircle, MdPlayCircle} from "react-icons/md";
import {Size} from "../../../../../utils/constants.ts";
import {getPlayButtonTitle, isPlaybackEnabled} from "../helpers.ts";
import {useAuth} from "../../../../../hooks/useAuth.tsx";

interface Properties {
    tune: Tune;
}

const PlayAudioButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {currentUser} = useAuth();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const disabled = !isPlaybackEnabled(tune, currentUser?.isUser);

    return (
        <Button
            title={getPlayButtonTitle(tune, currentUser?.isUser, t)}
            radius={"xl"}
            color={isPlaying && track?.audio === tune.audio ? "gray" : theme.primaryColor}
            variant={isPlaying && track?.audio === tune.audio ? "light" : "filled"}
            disabled={disabled}
            onClick={() =>
                isPlaying && track?.audio === tune.audio
                    ? pause()
                    : play(tune)
            }
            leftSection={isPlaying && track?.audio === tune.audio
                ? <MdPauseCircle
                    size={Size.icon.LG}
                    title={tune.audio ? tune.audio : t(`page.tunes.table.audioNotFound`)}
                />
                : <MdPlayCircle
                    size={Size.icon.LG}
                    title={tune.audio ? tune.audio : t(`page.tunes.table.audioNotFound`)}
                />}
        >
            {!(isPlaying && track?.audio === tune.audio) ? t("button.play") : t("button.stop")}
        </Button>
    );
}

export default PlayAudioButton;
