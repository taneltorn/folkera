import React from "react";
import {ActionIcon, Group, Slider, Tooltip} from "@mantine/core";
import {
    MdVolumeDown,
    MdVolumeMute,
    MdVolumeUp,
} from "react-icons/md";
import {useAudioPlayer} from "../../hooks/useAudioContext.tsx";
import {Size} from "../../utils/constants.ts";

const VolumeControls: React.FC = () => {

    const {
        volume,
        setVolume,
        isMuted,
        toggleMute,
    } = useAudioPlayer();

    const displayedVolume = isMuted
        ? 0
        : volume * 100;

    const VolumeIcon =
        isMuted || volume === 0
            ? MdVolumeMute
            : volume < 0.5
                ? MdVolumeDown
                : MdVolumeUp;

    return (
        <Group gap="xs" wrap="nowrap">
            <Tooltip label={isMuted ? "Unmute" : "Mute"}>
                <ActionIcon
                    color={isMuted ? "gray.3" : "red"}
                    variant="transparent"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    <VolumeIcon size={Size.icon.LG}/>
                </ActionIcon>
            </Tooltip>

            <Slider
                w={100}
                min={0}
                max={100}
                step={1}
                value={displayedVolume}
                onChange={(value) => setVolume(value / 100)}
                label={(value) => `${Math.round(value)}%`}
            />
        </Group>
    );
};

export default VolumeControls;