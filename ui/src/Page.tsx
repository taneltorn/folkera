import React, {useEffect} from "react";
import {Box} from "@mantine/core";

interface Properties {
    title?: string;
    children: React.ReactNode;
}

const Page: React.FC<Properties> = ({children, title}) => {

    useEffect(() => {
        document.title = `${title} - Folkera`;
    }, [title]);

    return (
        <Box mb={100}>
            {children}
        </Box>
    )
}

export default Page
