import React from "react";
import {useTranslation} from "react-i18next";
import {Table} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import TableLink from "../../components/footer/TableLink.tsx";

interface Properties {
    field: keyof Recording;
    recording: Recording;
    separator?: string;
}

const RecordingsInfoTableRow: React.FC<Properties> = ({field, recording, separator}) => {

    const {t} = useTranslation();
    const value = recording[field]?.toString();
    
    return (
        <Table.Tr key={field}>
            <Table.Td fw={"bold"}>
                {t(`recording.${field}`)}
            </Table.Td>
            <Table.Td>
                {value && <>
                {separator
                    ? value?.toString().split(separator)
                        .map((v, index) => <>
                            <TableLink key={index} value={v} field={field}>
                                {v.trim()}
                            </TableLink>
                            {index < value.split(separator).length - 1 && <span>, </span>}
                        </>)
                    : <TableLink
                        field={field}
                        value={recording[field] as string}
                    >
                        {recording[field]}
                    </TableLink>}
                </>}
            </Table.Td>
        </Table.Tr>
    );
}

export default RecordingsInfoTableRow;
