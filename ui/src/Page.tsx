import React, {useEffect} from "react";
import {Box} from "@mantine/core";

interface Properties {
    title?: string;
    children: React.ReactNode;
}

const Page: React.FC<Properties> = ({children, title}) => {

    useEffect(() => {
        document.title = `${title} - FolkERA`;
    }, [title]);

    return (
        <Box mb={"md"}>
            {children}
        </Box>
    )
}

export default Page
