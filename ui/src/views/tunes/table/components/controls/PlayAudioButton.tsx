import React from "react";
import {Button} from "@mantine/core";
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
    const {currentUser} = useAuth();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const disabled = !isPlaybackEnabled(tune, currentUser?.isUser);

    return (<>
            <Button
                title={getPlayButtonTitle(tune, currentUser?.isUser, isPlaying, t)}
                variant={"subtle"}
                color={"dark"}
                disabled={disabled}
                onClick={() => isPlaying && tune === track ? pause() : play(tune)}
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
        </>
    );
}

export default PlayAudioButton;
