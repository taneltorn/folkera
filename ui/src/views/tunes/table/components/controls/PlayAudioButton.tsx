import React from "react";
import {Button} from "@mantine/core";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../../model/Tune.ts";
import {MdPauseCircle, MdPlayCircle} from "react-icons/md";
import {Size} from "../../../../../utils/constants.ts";

interface Properties {
    tune: Tune;
}

const PlayAudioButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    return (<>
            <Button
                variant={"subtle"}
                color={"dark"}
                onClick={() => isPlaying && tune === track ? pause() : play(tune)}
                leftSection={isPlaying && track?.audio === tune.audio
                    ? <MdPauseCircle
                        size={Size.icon.LG}
                        title={tune.audio ? tune.audio : t(`view.tunes.table.audioNotFound`)}
                    />
                    : <MdPlayCircle
                        size={Size.icon.LG}
                        title={tune.audio ? tune.audio : t(`view.tunes.table.audioNotFound`)}
                    />}
            >
                {!isPlaying ? t("button.play") : t("button.stop")}
            </Button>
        </>
    );
}

export default PlayAudioButton;
