import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Group, Table, Text} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TableLink from "../../../../components/footer/TableLink.tsx";
import KivikeLink from "./KivikeLink.tsx";

interface Properties {
    field: keyof Tune;
    tune: Tune;
    separator?: string;
}

const fieldToTableLink = (field: keyof Tune, tune: Tune): ReactNode => {
    const value = tune[field]?.toString();
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
            <KivikeLink tune={tune}/>
        </>
    }

    if (["content", "notes", "comments"].includes(field)) {
        return <Text>{value}</Text>;
    }

    return <TableLink field={field} value={value}>
        {value}
    </TableLink>;

}

const TuneInfoTableRow: React.FC<Properties> = ({field, tune}) => {

    const {t} = useTranslation();

    return (
        <Table.Tr key={`row-${field}`}>
            <Table.Td fw={"bold"}>
                {t(`tune.${field}`)}
            </Table.Td>
            <Table.Td>
                <Group gap={4}>
                    {fieldToTableLink(field, tune)}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default TuneInfoTableRow;
