import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Group, Stack, Table, Text} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TableLink from "../../../../components/footer/TableLink.tsx";
import KivikeLink from "./KivikeLink.tsx";
import TuneLink from "../../../../components/TuneLink.tsx";
import {refToId} from "../../../../utils/helpers.tsx";

interface Properties {
    field: keyof Tune;
    tune: Tune;
    separator?: string;
}

const fieldToTableLink = (field: keyof Tune, tune: Tune): ReactNode => {

    const {t} = useTranslation();

    const value = tune[field]?.toString();
    if (!value) {
        return "";
    }

    if (["year", "performer", "instrument", "collector"].includes(field)) {
        return value.split(",")
            .map((v, index) =>
                <Text key={`table-cell-${index}-${field}`}>
                    <TableLink value={v} field={field} replace>
                        {v.trim()}
                    </TableLink>
                    {index < value?.split(",").length - 1 && <span>, </span>}
                </Text>)
    }

    if (["ref"].includes(field)) {
        return <Text >
            {value}
        </Text>
    }

    if (["audioRef"].includes(field)) {
        return <TuneLink to={`/tunes/${refToId(tune.audioRef)}`} label={tune.audioRef}/>
    }

    if (["notationRef"].includes(field)) {
        return <TuneLink to={`/tunes/${refToId(tune.notationRef)}`} label={tune.notationRef}/>
    }

    if (["pid"].includes(field)) {
        return <>
            <TableLink field={field} value={value} replace>
                {value}
            </TableLink>
            <KivikeLink tune={tune}/>
        </>
    }

    if (["content", "comments"].includes(field)) {
        return <Text>{value}</Text>;
    }

    if (["notes"].includes(field)) {
        return <Stack gap={0}>
            {value.split(";").map((v, i) =>
                <Text key={i}>
                    {v}
                </Text>)}
        </Stack>;
    }

    if (["datatype", "access", "trainset"].includes(field)) {
        return <TableLink field={field} value={value} replace>
            {t(`${field}.${value}`)}
        </TableLink>;
    }

    return <TableLink field={field} value={value} replace>
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
