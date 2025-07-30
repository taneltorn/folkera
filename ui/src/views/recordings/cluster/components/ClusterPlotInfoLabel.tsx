import React from "react";
import {Stack, Text} from "@mantine/core";

interface Properties {
    label: string;
    value: string | number;
}

const ClusterPlotInfoLabel: React.FC<Properties> = ({label, value}) => {

    return (
        <Stack gap={4}>
            <Text fw={"bold"} size={"sm"}>{label}</Text>
            <Text size={"sm"}>{value}</Text>
        </Stack>
    );
};

export default ClusterPlotInfoLabel;
