import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Group, Text, useMantineTheme} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import TableLink from "../../components/footer/TableLink.tsx";

interface Properties {
    field: keyof Recording;
    recording: Recording;
    separator?: string;
}

const RecordingsInfoTableRow: React.FC<Properties> = ({field, recording, separator}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const value = recording[field]?.toString();

    return (
        <Group wrap={"nowrap"} style={{borderBottom: `2px solid ${theme.colors.gray[2]}`}}>
            <Box fw={"bold"} miw={175} maw={175}>
                {t(`recording.${field}`)}
            </Box>
            <Box>
                {value && <>
                    {separator
                        ? value?.toString().split(separator)
                            .map((v, index) => <>
                                <TableLink key={index} value={v} field={field}>
                                    {v.trim()}
                                </TableLink>
                                {index < value.split(separator).length - 1 && <Text mr={"xs"}>,</Text>}
                            </>)
                        : <TableLink
                            field={field}
                            value={recording[field] as string}
                        >
                            {recording[field]}
                        </TableLink>}
                </>}
            </Box>
        </Group>
    );
}

export default RecordingsInfoTableRow;
