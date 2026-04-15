import React from "react";
import {Box, Grid, Table} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import MusicXmlViewer from "./MusicXmlViewer.tsx";
import TuneInfoTableRow from "./TuneInfoTableRow.tsx";
import VariantSelection from "./VariantSelection.tsx";

interface Properties {
    tune: Tune;
}

const TuneDetailsInfo: React.FC<Properties> = ({tune}) => {

    const xmls = tune.musicxml?.split(";") || [];

    return (
        <Box px={"md"}>
            {tune.datatype === "NOTATION" &&
                <Grid mt={"md"}>
                    <Grid.Col span={{base: 12}}>
                        <MusicXmlViewer tune={tune}/>
                    </Grid.Col>
                </Grid>}

            {xmls.length > 1 && <Box mt={"md"} mb={"xl"}>
                <VariantSelection count={xmls.length}/>
            </Box>}

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
                                "access",
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
