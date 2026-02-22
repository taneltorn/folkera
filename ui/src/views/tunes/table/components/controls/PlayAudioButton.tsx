import React from "react";
import {useMantineTheme} from "@mantine/core";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../../model/Tune.ts";
import {MdPauseCircle, MdPlayCircle} from "react-icons/md";

interface Properties {
    tune: Tune;
}

const PlayAudioButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    return (<>
            {isPlaying && track?.audio === tune.audio
                ? <MdPauseCircle
                    size={44}
                    className={"hover-pointer"}
                    color={theme.colors.dark[9]}
                    title={tune.audio ? tune.audio : t(`view.tunes.table.audioNotFound`)}
                    onClick={() => pause()}
                />
                : <MdPlayCircle
                    size={44}
                    className={"hover-pointer"}
                    // color={theme.colors.dark[9]}
                    title={tune.audio ? tune.audio : t(`view.tunes.table.audioNotFound`)}
                    onClick={() => isPlaying && tune === track ? pause() : play(tune)}
                />
            }
        </>
    );
}

export default PlayAudioButton;
