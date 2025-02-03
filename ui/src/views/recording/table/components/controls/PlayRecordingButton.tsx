import React from "react";
import {Button, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {useAudioPlayer} from "../../../../../hooks/useAudioContext.tsx";
import {Size} from "../../../../../utils/common.constants.ts";
import {PiSpeakerHigh, PiSpeakerSlashLight} from "react-icons/pi";
import {useTranslation} from "react-i18next";
import {Recording} from "../../../../../../../domain/Recording.ts";

interface Properties {
    recording: Recording;
}

const PlayRecordingButton: React.FC<Properties> = ({recording}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();

    return (
        <Button
            px={0}
            w={30}
            size={"compact-xs"}
            variant={"transparent"}
            title={recording.file ? recording.file : t(`view.recordings.table.fileNotFound`)}
            onClick={() => isPlaying && recording === track ? pause() : play(recording)}
        >
            {!recording?.file
                ? <PiSpeakerSlashLight color={theme.colors.dark[1]} size={Size.icon.SM}/>
                : (track?.file === recording.file && isPlaying
                    ? <span title={recording.file}>
                        <Audio
                            color={theme.colors.red[9]}
                            visible={isPlaying}
                            height={Size.icon.MD}
                            width={Size.icon.XS}
                        />
                </span>
                    : <PiSpeakerHigh color={theme.colors.dark[9]} size={Size.icon.SM}/>)}
        </Button>
    );
}

export default PlayRecordingButton;
