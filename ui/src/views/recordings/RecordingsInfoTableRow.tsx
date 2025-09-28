import React from "react";
import {useTranslation} from "react-i18next";
import {Group, Table} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import TableLink from "../../components/footer/TableLink.tsx";
import KivikeLink from "./KivikeLink.tsx";

interface Properties {
    field: keyof Recording;
    recording: Recording;
    separator?: string;
}

const RecordingsInfoTableRow: React.FC<Properties> = ({field, recording, separator}) => {

    const {t} = useTranslation();
    const value = recording[field]?.toString();

    return (
        <Table.Tr key={`row-${field}`}>
            <Table.Td fw={"bold"}>
                {t(`recording.${field}`)}
            </Table.Td>
            <Table.Td>
                <Group gap={"xs"}>
                    {value && <>
                        {separator
                            ? value?.toString().split(separator)
                                .map((v, index) => <React.Fragment key={`table-cell-${index}-${field}`}>
                                    <TableLink value={v} field={field}>
                                        {v.trim()}
                                    </TableLink>
                                    {index < value.split(separator).length - 1 && <span>, </span>}
                                </React.Fragment>)
                            : <TableLink
                                field={field}
                                value={recording[field] as string}
                            >
                                {recording[field]}
                            </TableLink>}
                        {field === "pid" && <KivikeLink recording={recording}/>}
                    </>}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default RecordingsInfoTableRow;
