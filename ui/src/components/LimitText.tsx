import React from "react";
import {Text, TextProps} from "@mantine/core";

interface Properties extends TextProps {
    text: string;
    limit?: number;
}

const LimitText: React.FC<Properties> = ({text, limit, ...props}) => {

    const overfill = "...";

    return (
        <Text {...props}>
            {(text.length + overfill.length) < text.length
                ? `${text.slice(0, limit)}${overfill}`
                : text}
        </Text>
    );
}

export default LimitText;