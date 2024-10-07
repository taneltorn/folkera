import React from 'react';
import {Text} from "@mantine/core";

interface Properties {
    text: string;
    cropAt?: number;
}

const CroppedText: React.FC<Properties> = ({text, cropAt}) => {

    return (
        <Text>
            {cropAt && text.length > cropAt
                ? `${text.slice(0, cropAt)}...`
                : text}
        </Text>
    )
}

export default CroppedText;
