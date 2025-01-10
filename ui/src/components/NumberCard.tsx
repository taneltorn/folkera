import React from "react";
import {Card, Center, Text} from "@mantine/core";

interface Properties {
    value: number;
    label: string;
}

const NumberCard: React.FC<Properties> = ({label, value}) => {


    return (
        <Card withBorder={false} radius={0}>
            <Card.Section>
                <Center>
                    <Text fz={48}>
                        {value}
                    </Text>
                </Center>
            </Card.Section>
            <Card.Section>
                <Center>
                    <Text fw={"bold"} size={"sm"}>
                        {label}
                    </Text>
                </Center>
            </Card.Section>
        </Card>
    );
}

export default NumberCard;
