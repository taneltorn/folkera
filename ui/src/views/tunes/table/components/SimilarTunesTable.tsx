import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Group, Pagination, ScrollArea, Table} from "@mantine/core";
import SimilarTunesTableRow from "./SimilarTunesTableRow.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {useSimilarTunes} from "../../../../hooks/useSimilarTunes.tsx";
import {LuAudioLines} from "react-icons/lu";
import {LoadingState} from "../../../../model/LoadingState.ts";
import InfoMessage from "../../../../components/InfoMessage.tsx";

interface Properties {
    onSave: () => void;
}

const SimilarTunesTable: React.FC<Properties> = ({onSave}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {similarTunes, loadingState} = useSimilarTunes();
    const [pagination, setPagination] = useState({size: 10, page: 1});

    return (<>
        {similarTunes.length > 0 && <>
            <ScrollArea pb={"xs"}>
                <Table
                    highlightOnHover
                    withColumnBorders={false}
                    withRowBorders={false}
                    stickyHeader={true}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <Group justify={"center"}>
                                    <LuAudioLines size={Size.icon.SM}/>
                                </Group>
                            </Table.Th>
                            <Table.Th>{t("tune.similarity")}</Table.Th>
                            <Table.Th>{t("tune.melody")}</Table.Th>
                            <Table.Th>{t("tune.ref")}</Table.Th>
                            <Table.Th>{t("tune.content")}</Table.Th>
                            <Table.Th>{t("tune.year")}</Table.Th>
                            <Table.Th>{t("tune.instrument")}</Table.Th>
                            <Table.Th>{t("tune.performer")}</Table.Th>
                            <Table.Th>{t("tune.parish")}</Table.Th>
                            {currentUser?.isAdmin && <Table.Th/>}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {similarTunes
                            .slice(pagination.page && pagination.size
                                    ? (pagination.page - 1) * pagination.size
                                    : 0,
                                pagination.page && pagination.size ?
                                    pagination.page * pagination.size
                                    : 100)
                            .map((tune, index) => (
                                <SimilarTunesTableRow key={`similar-tunes-row-${index}-${tune.id}`} tune={tune} onSave={onSave}/>
                            ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            <Group mt={"md"} mb={85} px={"md"} justify={"end"}>
                <Pagination
                    color={"dark.9"}
                    size={"md"}
                    variant={"subtle"}
                    value={pagination.page}
                    total={pagination.size ? Math.ceil(similarTunes.length / pagination.size) : similarTunes.length}
                    onChange={(value) => setPagination({...pagination, page: value})}
                    styles={{
                        control: {
                            border: 'none',
                        },
                    }}
                />
            </Group>
        </>}

        {loadingState === LoadingState.ERROR &&
            <InfoMessage mx={"md"} color={"red"} title={t("data.fetchFailed")}/>}
    </>);
}

export default SimilarTunesTable;
