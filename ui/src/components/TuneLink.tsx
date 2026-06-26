import React from "react";
import {Group, Text} from "@mantine/core";
import {Link} from "react-router-dom";

interface Properties {
    to: string;
    label: string | undefined;
}

const TuneLink: React.FC<Properties> = ({to, label}) => {

    return (
        <Group wrap={"nowrap"}>
            <Link to={to}>
                <Text size="sm" fw={700}>
                    {label}
                </Text>
            </Link>
        </Group>
    );
}

export default TuneLink;
