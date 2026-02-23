import React from "react";
import {Text} from '@mantine/core';

interface Properties {
    title: string;
}

const ModalTitle: React.FC<Properties> = ({title}) => {

    return (
        <Text size={"xl"} fw={"bold"}>{title}</Text>
    );
}

export default ModalTitle;
