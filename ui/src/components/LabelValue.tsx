import React from "react";
import {Group, GroupProps, Text} from "@mantine/core";

interface Properties {
    props?: GroupProps;
    label: string;
    value: any;
}

const LabelValue: React.FC<Properties> = (props) => {

    return (
        <Group {...props.props}>
            <Text size={"xs"} fw={"bold"}>
                {props.label}
            </Text>
            <Text size={"xs"}>
                {props.value}
            </Text>
        </Group>
    );
}

export default LabelValue;