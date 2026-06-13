import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../../model/Tune.ts";
import {IconSize} from "../../../../../utils/mappers.ts";
import {useAuth} from "../../../../../hooks/useAuth.tsx";
import {getPlayButtonTitle, isPlaybackEnabled} from "../helpers.ts";
import {FaPlay} from "react-icons/fa";
import {LuAudioLines} from "react-icons/lu";
import {IoMusicalNotes} from "react-icons/io5";

interface Properties {
    tune: Tune;
    hovered?: boolean;
}

const TunesTablePlayAudioButton: React.FC<Properties> = ({tune, hovered}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    const iconSize = IconSize.get("sm");

    const isUser = currentUser?.isUser;
    const disabled = !isPlaybackEnabled(tune, isUser);
    const isCurrentTrack = track?.audio === tune.audio;
    const isCurrentTrackPlaying = isCurrentTrack && isPlaying;

    const mutedColor = theme.colors.gray[3];
    const activeColor = theme.colors[theme.primaryColor][9];

    const handleClick = () => {
        if (isCurrentTrackPlaying) {
            pause();
        } else {
            play(tune);
        }
    };

    const renderIcon = () => {
        if (isCurrentTrackPlaying) {
            return (
                <Audio
                    color={activeColor}
                    visible
                    width={iconSize}
                />
            );
        }

        if (!disabled && hovered) {
            return <FaPlay color={activeColor} size={iconSize}/>;
        }

        const Icon = tune.datatype === "AUDIO" ? LuAudioLines : IoMusicalNotes;
        const color = disabled ? mutedColor : undefined;

        return <Icon size={iconSize} color={color}/>;
    };

    return (
        <Button
            w={50}
            px="xs"
            size="sm"
            color={theme.colors.dark[disabled ? 1 : 9]}
            variant="transparent"
            title={getPlayButtonTitle(tune, isUser, t)}
            disabled={disabled}
            onClick={handleClick}
        >
            {renderIcon()}
        </Button>
    );
};

export default TunesTablePlayAudioButton;
