import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {PiSpeakerHigh, PiSpeakerSlashLight} from "react-icons/pi";
import {useTranslation} from "react-i18next";
import {Recording} from "../../../../../model/Recording.ts";
import {IconSize} from "../../../../../utils/mappers.ts";

interface Properties {
    recording: Recording;
    size?: string;
    variant?: string;
    c?: string;
    color?: string;
}


const PlayRecordingButton: React.FC<Properties> = ({recording, size, c, color, ...props}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    const iconSize = IconSize.get(size || "sm")

    return (
        <Button
            px={"xs"}
            color={color || theme.colors.red[9]}
            size={size || "compact-md"}
            variant={props.variant ||  "subtle"}
            title={recording.file ? recording.file : t(`view.recordings.table.fileNotFound`)}
            onClick={() => isPlaying && recording === track ? pause() : play(recording)}
            style={{flexShrink: 0}}
        >
            {!recording?.file
                ? <PiSpeakerSlashLight color={c || theme.colors.dark[1]} size={iconSize}/>
                : (track?.file === recording.file && isPlaying
                    ? <span title={recording.file}>
                        <Audio
                            color={c || theme.colors.red[9]}
                            visible={isPlaying}
                            width={iconSize}
                        />
                </span>
                    : <PiSpeakerHigh color={c || theme.colors.dark[9]} size={iconSize}/>)}
        </Button>
    );
}

export default PlayRecordingButton;
