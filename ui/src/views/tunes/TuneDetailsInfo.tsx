import React from "react";
import {Box, Grid, Table} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import MusicXmlViewer from "./details/components/MusicXmlViewer.tsx";
import TuneInfoTableRow from "./details/components/TuneInfoTableRow.tsx";

interface Properties {
    tune: Tune;
}

const TuneDetailsInfo: React.FC<Properties> = ({tune}) => {

    return (
        <Box px={"md"}>
            {tune.datatype === "NOOT" && <Grid mt={"md"}>
                <Grid.Col span={{base: 12, xl: 8}}>
                    <MusicXmlViewer tune={tune}/>
                </Grid.Col>
            </Grid>}

            <Grid mt={"md"}>
                <Grid.Col span={{baseline: 12, md: 8, xl: 6}}>
                    <Table>
                        <Table.Tbody>
                            {[
                                "content",
                                "ref",
                                "pid",
                                "year",
                                "melody",
                                "instrument",
                                "performer",
                                "dance",
                                "parish",
                                "origin",
                                "collector",
                                "audioRef",
                                "notationRef",
                                "datatype",
                                "trainset",
                                "notes",
                                "comments"]
                                .map((field, index) => (
                                    <React.Fragment key={`row-div-${index}-${field}`}>
                                        {tune[field as keyof Tune] &&
                                            <TuneInfoTableRow
                                                key={`info-table-row-${index}-${field}`}
                                                field={field as keyof Tune}
                                                tune={tune}
                                            />}
                                    </React.Fragment>))}
                        </Table.Tbody>
                    </Table>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

export default TuneDetailsInfo;
