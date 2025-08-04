import React from "react";
import {Group, GroupProps, Text, Tooltip} from "@mantine/core";

interface Properties {
    props?: GroupProps;
    title?: string;
    label: string;
    value: any;
}

const LabelValue: React.FC<Properties> = (props) => {

    return (
        <Group {...props.props} gap={"xs"}>
            <Text size={"sm"} fw={"bold"}>
                {props.label}
            </Text>

            {props.title
                ? <Tooltip label={props.title}>
                    <Text size={"sm"}>
                        {props.value}
                    </Text>
                </Tooltip>
                : <Text size={"sm"}>
                    {props.value}
                </Text>}
        </Group>
    );
}

export default LabelValue;