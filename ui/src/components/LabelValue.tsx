import React from "react";
import {Group, GroupProps, Text, Tooltip, useMantineTheme} from "@mantine/core";

interface Properties extends GroupProps {
    title?: string;
    label: string;
    value: any;
}

const LabelValue: React.FC<Properties> = ({title, label, value, ...props}) => {

    const theme = useMantineTheme();

    return (
        <Group {...props} gap={"xs"}>
            <Text size={"sm"} fw={"bold"}>
                {label}
            </Text>

            {title
                ? <Tooltip label={title}>
                    <Text size={"md"} fw={"bold"} c={theme.primaryColor}>
                        {value}
                    </Text>
                </Tooltip>
                : <Text size={"md"} fw={"bold"} c={theme.primaryColor}>
                    {value}
                </Text>}
        </Group>
    );
}

export default LabelValue;