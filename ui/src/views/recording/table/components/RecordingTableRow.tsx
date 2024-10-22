import React, {useRef} from "react";
import {Button, Group, Table, Text, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {Recording} from "../../../../model/Recording.ts";
import {useAudioPlayer} from "../../../../hooks/useAudioContext.tsx";
import {Size} from "../../../../utils/common.constants.ts";
import RecordingTableCell from "./RecordingTableCell.tsx";
import FilterButtons from "./FilterButtons.tsx";
import {PiSpeakerHigh, PiSpeakerSlashLight} from "react-icons/pi";
import {useTranslation} from "react-i18next";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";

interface Properties {
    recording: Recording;
}

const RecordingTableRow: React.FC<Properties> = ({recording}) => {

    const ref = useRef<any>();
    const {t} = useTranslation();
    const theme = useMantineTheme();
    const {track, isPlaying, play, pause} = useAudioPlayer();
    const {hiddenFields} = useDataFiltering();

    return (
        <Table.Tr ref={ref}>
            <Table.Td hidden={hiddenFields.includes("ref")} py={0}>
                <Group wrap={"nowrap"}>
                    <Button
                        px={4}
                        w={32}
                        variant={"transparent"}
                        title={recording.file ? recording.file: t(`view.recordings.table.fileNotFound"}`)}
                        onClick={() => isPlaying && recording === track ? pause() : play(recording)}
                    >
                        {!recording?.file
                            ? <PiSpeakerSlashLight color={theme.colors.dark[1]} size={Size.icon.SM}/>
                            : (track?.file === recording.file && isPlaying
                                ? <span title={recording.file}><Audio color={theme.colors.red[9]}
                                         visible={isPlaying}
                                         height={Size.icon.MD}
                                         width={Size.icon.XS}/></span>
                                : <PiSpeakerHigh color={theme.colors.dark[9]}  size={Size.icon.SM}/>)}
                    </Button>

                    <Text size={"xs"}>
                        {recording.ref}
                    </Text>
                </Group>
            </Table.Td>

            <RecordingTableCell recording={recording} field={"content"}>
                <Text size={"xs"}>
                    {recording.content}
                </Text>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"piece"}>
                <FilterButtons
                    recording={recording}
                    field={"piece"}
                    color={"pink"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"melody"}>
                <FilterButtons
                    recording={recording}
                    field={"melody"}
                    split={","}
                    color={"pink"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"year"}>
                <FilterButtons
                    recording={recording}
                    field={"year"}
                    split={","}
                    color={"red"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"instrument"}>
                <FilterButtons
                    recording={recording}
                    field={"instrument"}
                    split={","}
                    color={"green"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"performer"}>
                <FilterButtons
                    recording={recording}
                    field={"performer"}
                    split={","}
                    color={"yellow"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"location"}>
                <FilterButtons recording={recording} field={"location"} split={","}/>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"collector"}>
                <FilterButtons recording={recording} field={"collector"} split={","}/>
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"archive"}>
                <FilterButtons
                    recording={recording}
                    field={"archive"}
                    color={"violet"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"notes"}>
                {recording.notes}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"comments"}>
                {recording.comments}
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"file"}>
                {recording.file}
            </RecordingTableCell>
        </Table.Tr>
    );
}

export default RecordingTableRow;
