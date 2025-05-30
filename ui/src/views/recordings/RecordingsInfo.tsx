import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Group, Text} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";

interface Properties {
    recording: Recording;
}

const RecordingsInfo: React.FC<Properties> = ({recording}) => {

    const {t} = useTranslation();

    return (
        <Group>
            <Box>
                <Text fw={"bold"}>{t("recording.year")}</Text>
                <Text fw={"bold"}>{t("recording.performer")}</Text>
                <Text fw={"bold"}>{t("recording.instrument")}</Text>
                <Text fw={"bold"}>{t("recording.parish")}</Text>
            </Box>
            <Box>
                <Text>{recording.year}</Text>
                <Text>{recording.performer}</Text>
                <Text>{recording.instrument} </Text>
                <Text>{recording.parish}</Text>
            </Box>
        </Group>
    );
}

export default RecordingsInfo;
