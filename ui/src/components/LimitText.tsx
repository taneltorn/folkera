import React from "react";
import {Text, TextProps} from "@mantine/core";
import {truncate} from "../utils/helpers.tsx";

interface Properties extends TextProps {
    text: string | undefined;
    limit: number;
}

const LimitText: React.FC<Properties> = ({text, limit, ...props}) => {

    return (
        <Text {...props}>
            {truncate(text || "", limit)}
        </Text>
    );
}

export default LimitText;