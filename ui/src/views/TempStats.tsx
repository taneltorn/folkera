import React, {useEffect, useState} from "react";
import {useStatsService} from "../hooks/useStatsService.tsx";
import {useDataService} from "../hooks/useDataService.tsx";
import { Box, Grid,  Table, TableTr} from "@mantine/core";
import {DisplayError, isEmpty} from "../utils/common.helpers.tsx";
import {StatsItem} from "../model/Stats.ts";
import {useTranslation} from "react-i18next";
import {DataFilteringContextProvider, useDataFiltering} from "../hooks/useDataFiltering.tsx";
import LoadingOverlay from "../components/LoadingOverlay.tsx";
import {Recording} from "../../../domain/Recording.ts";

const TempStatsContent: React.FC<{isLoading: boolean}> = ({isLoading}) => {

    const {filteredData} = useDataFiltering();

    const {fetchStats} = useStatsService();

    const [contentStats, setContentStats] = useState<StatsItem[]>([]);
    const [performerStats, setPerformerStats] = useState<StatsItem[]>([]);

    const sort = (stats: StatsItem[]) => {
        const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
        const data = [];
        sorted.forEach(s => {
            data.push(s);
        });
        return data;
    }

    useEffect(() => {
        if (isEmpty(filteredData)) {
            return;
        }

        fetchStats(filteredData, {groupBy: "content"})
            .then(data => setContentStats(sort(data)));

        fetchStats(filteredData, {groupBy: "performer"})
            .then(data => setPerformerStats(sort(data)));

    }, [filteredData]);

    return (
        <Box px={"md"}>
            <LoadingOverlay isLoading={isLoading}>

                <Grid>
                    <Grid.Col span={3} me={"xl"}>
                        <Table>
                            <Table.Thead>
                                <TableTr>
                                    <Table.Th>Sisu</Table.Th>
                                    <Table.Th>Esitusi</Table.Th>
                                </TableTr>
                            </Table.Thead>
                            <Table.Tbody>
                                {contentStats.map((s, i) => (
                                    <Table.Tr key={i}>
                                        <Table.Td>{s[0]}</Table.Td>
                                        <Table.Td>{s[1]}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Table>
                            <Table.Thead>
                                <TableTr>
                                    <Table.Th>Esitaja</Table.Th>
                                    <Table.Th>Esitusi</Table.Th>
                                </TableTr>
                            </Table.Thead>
                            <Table.Tbody>
                                {performerStats.map((s, i) => (
                                    <Table.Tr key={i}>
                                        <Table.Td>{s[0]}</Table.Td>
                                        <Table.Td>{s[1]}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Grid.Col>
                </Grid>
            </LoadingOverlay>
        </Box>
    );
}

const TempStats: React.FC = () => {

    const {t} = useTranslation();
    const {fetchData,isLoading, cancelSource} = useDataService();

    const [data, setData] = useState<Recording[]>([]);

    useEffect(() => {
        fetchData()
            .then(setData)
            .catch(e => DisplayError(e, t("toast.error.fetchData")));

        return () => {
            cancelSource.cancel('Operation canceled by the user.');
        };
    }, []);

    return (
        <DataFilteringContextProvider data={data} filters={[]}>
            <TempStatsContent isLoading={isLoading}/>
        </DataFilteringContextProvider>
    )
}

export default TempStats;
