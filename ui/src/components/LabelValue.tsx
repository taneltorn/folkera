import React from "react";
import {Group, GroupProps, Text} from "@mantine/core";

interface Properties {
    props?: GroupProps;
    label: string;
    value: any;
}

const LabelValue: React.FC<Properties> = (props) => {

    return (
        <Group {...props.props} gap={"xs"}>
            <Text size={"sm"} fw={"bold"}>
                {props.label}
            </Text>
            <Text size={"sm"}>
                {props.value}
            </Text>
        </Group>
    );
}

export default LabelValue;