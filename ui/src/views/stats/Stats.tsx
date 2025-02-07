import React, {useEffect, useMemo, useState} from "react";
import {Box,   Text} from "@mantine/core";
import {Recording} from "../../../../domain/Recording.ts";
import {useDataService} from "../../hooks/useDataService.tsx";

const Stats: React.FC = () => {

    const {fetchData, cancelSource} = useDataService();

    const [recordings, setRecordings] = useState<Recording[]>([]);

    const trainPerfs = useMemo(() => recordings.filter(r => r.datatype === "TR"), [recordings]);
    const testPerfs = useMemo(() => recordings.filter(r => r.datatype === "TE"), [recordings]);

    const trainWorks = useMemo(() => trainPerfs.filter((recording, index, self) => self.findIndex(r => r.tune === recording.tune) === index), [trainPerfs]);
    const testWorks = useMemo(() => testPerfs.filter((recording, index, self) => self.findIndex(r => r.tune === recording.tune) === index), [testPerfs]);
    
    useEffect(() => {
        fetchData().then(setRecordings);

        return () => {
            cancelSource.cancel();
        };
    }, []);

    return (
        <Box px={"md"}>
            <Text fw={"bold"}>Total</Text>
            <Text>{trainPerfs.length + testPerfs.length} ({trainWorks.length + testWorks.length})</Text>
            
            <Text fw={"bold"} mt={"md"}>Train</Text>
            <Text>{trainPerfs.length} ({trainWorks.length})</Text>

            <Text fw={"bold"} mt={"md"}>Test</Text>
            <Text>{testPerfs.length} ({testWorks.length})</Text>

        </Box>
    );
}

export default Stats;
