import React from "react";
import {Grid, Table} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import TuneInfoTableRow from "./TuneInfoTableRow.tsx";

interface Properties {
    tune: Tune;
}

const TuneInfoTable: React.FC<Properties> = ({tune}) => {

    return (
        <Grid>
            <Grid.Col span={{baseline: 12, md: 8, xl: 6}}>
                <Table>
                    <Table.Tbody>
                        {[
                            "ref",
                            "pid",
                            "content",
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
    );
}

export default TuneInfoTable;
