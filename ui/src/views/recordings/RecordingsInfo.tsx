import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Group, Text} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";

interface Properties {
    recording: Recording;
}

const WIDTH = 120;

const RecordingsInfo: React.FC<Properties> = ({recording}) => {

    const {t} = useTranslation();

    return (
        <>
        <Box>
            <Group wrap={"nowrap"} align={"baseline"} gap={0}>
                <Text miw={WIDTH} fw={"bold"}>{t("recording.year")}</Text>
                <Text>{recording.year || "-"}</Text>
            </Group>
            <Group wrap={"nowrap"} align={"baseline"} gap={0}>
                <Text miw={WIDTH} fw={"bold"}>{t("recording.performer")}</Text>
                <Text>{recording.performer || "-"}</Text>

            </Group>
            <Group wrap={"nowrap"} align={"baseline"} gap={0}>
                <Text miw={WIDTH} fw={"bold"}>{t("recording.instrument")}</Text>
                <Text>{recording.instrument || "-"} </Text>

            </Group>
            <Group wrap={"nowrap"} align={"baseline"} gap={0}>
                <Text miw={WIDTH} fw={"bold"}>{t("recording.parish")}</Text>
                <Text>{recording.parish || "-"}</Text>
            </Group>
        </Box>
    </>
    );
}

export default RecordingsInfo;
