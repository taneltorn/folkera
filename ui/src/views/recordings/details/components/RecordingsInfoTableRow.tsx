import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Group, Table, Text} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import TableLink from "../../../../components/footer/TableLink.tsx";
import KivikeLink from "./KivikeLink.tsx";

interface Properties {
    field: keyof Recording;
    recording: Recording;
    separator?: string;
}

const fieldToTableLink = (field: keyof Recording, recording: Recording): ReactNode => {
    const value = recording[field]?.toString();
    if (!value) {
        return "";
    }
    
    if (["year", "performer", "instrument", "collector"].includes(field)) {
        return value.split(",")
            .map((v, index) =>
                <Text key={`table-cell-${index}-${field}`}>
                    <TableLink value={v} field={field}>
                        {v.trim()}
                    </TableLink>
                    {index < value?.split(",").length - 1 && <span>, </span>}
                </Text>)
    }
    
    if (["pid"].includes(field)) {
        return <>
            <TableLink field={field} value={value}>
                {value}
            </TableLink>
            <KivikeLink recording={recording}/>
        </>
    }

    if (["content", "notes", "comments"].includes(field)) {
        return <Text>{value}</Text>;
    }

    return <TableLink field={field} value={value}>
        {value}
    </TableLink>;

}

const RecordingsInfoTableRow: React.FC<Properties> = ({field, recording}) => {

    const {t} = useTranslation();

    return (
        <Table.Tr key={`row-${field}`}>
            <Table.Td fw={"bold"}>
                {t(`recording.${field}`)}
            </Table.Td>
            <Table.Td>
                <Group gap={4}>
                    {fieldToTableLink(field, recording)}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default RecordingsInfoTableRow;
