import React, {useRef} from "react";
import {Button, Group, Table, Text, useMantineTheme} from "@mantine/core";
import {Audio} from "react-loader-spinner";
import {useAudioPlayer} from "../../../../hooks/useAudioContext.tsx";
import {Size} from "../../../../utils/common.constants.ts";
import RecordingTableCell from "./RecordingTableCell.tsx";
import FilterButtons from "./FilterButtons.tsx";
import {PiSpeakerHigh, PiSpeakerSlashLight} from "react-icons/pi";
import {useTranslation} from "react-i18next";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";
import {range} from "../../../../utils/common.helpers.tsx";
import {CiStar} from "react-icons/ci";
import {FaRegStar, FaStar} from "react-icons/fa";

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
            <Table.Td  px={"xs"} py={0}>
                <Button
                    px={0}
                    variant={"transparent"}
                    title={recording.file ? recording.file: t(`view.recordings.table.fileNotFound`)}
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
            </Table.Td>
            <Table.Td hidden={hiddenFields.includes("ref")} >
                <Group wrap={"nowrap"}>
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
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"melody"}>
                <FilterButtons
                    recording={recording}
                    field={"melody"}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"parts"}>
                <FilterButtons
                    recording={recording}
                    field={"parts"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"quality"}>
                {/*{recording.quality && <Group wrap={"nowrap"} gap={0}>*/}
                {/*    {range(1, 5 - Number(recording.quality?.split("Q")[1])).map(_ => (*/}
                {/*        <FaStar />*/}
                {/*    ))}*/}
                {/*    {range(1, Number(recording.quality?.split("Q")[1])).map(_ => (*/}
                {/*        <FaRegStar  />*/}
                {/*    ))}*/}
                {/*</Group>}*/}

                <FilterButtons
                    recording={recording}
                    field={"quality"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"similarity"}>
                <FilterButtons
                    recording={recording}
                    field={"similarity"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"year"}>
                <FilterButtons
                    recording={recording}
                    field={"year"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"instrument"}>
                <FilterButtons
                    recording={recording}
                    field={"instrument"}
                    split={","}
                />
            </RecordingTableCell>

            <RecordingTableCell recording={recording} field={"performer"}>
                <FilterButtons
                    recording={recording}
                    field={"performer"}
                    split={","}
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
