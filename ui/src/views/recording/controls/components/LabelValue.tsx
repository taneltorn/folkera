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
            <Text size={"sm"} fw={"bold"}>
                {props.label}
            </Text>
            <Text>
                {props.value}
            </Text>
        </Group>
    );
}

export default LabelValue;