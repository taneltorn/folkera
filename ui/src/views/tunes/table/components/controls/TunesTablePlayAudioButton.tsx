import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {PiSpeakerHigh, PiSpeakerSlash} from "react-icons/pi";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../../model/Tune.ts";
import {IconSize} from "../../../../../utils/mappers.ts";
import {useAuth} from "../../../../../hooks/useAuth.tsx";
import {getPlayButtonTitle, isPlaybackEnabled} from "../helpers.ts";

interface Properties {
    tune: Tune;
}


const TunesTablePlayAudioButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    const iconSize = IconSize.get("sm");
    const disabled = !isPlaybackEnabled(tune, currentUser?.isUser);

    return (
        <Button
            px={"xs"}
            size={"sm"}
            color={theme.colors.dark[ disabled ? 1 : 9]}
            variant={"subtle"}
            title={getPlayButtonTitle(tune, currentUser?.isUser, isPlaying, t)}
            disabled={disabled}
            onClick={() => isPlaying && tune === track ? pause() : play(tune)}
        >
            {track?.audio === tune.audio && isPlaying
                ? <Audio
                    color={theme.colors.red[9]}
                    visible={isPlaying}
                    width={iconSize}
                />
                : (disabled ? <PiSpeakerSlash color={theme.colors.gray[4]} size={iconSize} /> : <PiSpeakerHigh size={iconSize} />)}
        </Button>
    );
}

export default TunesTablePlayAudioButton;
