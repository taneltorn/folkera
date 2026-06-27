import React, {useEffect} from "react";
import {Box} from "@mantine/core";
import {useAudioPlayer} from "./hooks/useAudioContext.tsx";

interface Properties {
    title?: string;
    children: React.ReactNode;
}

const Page: React.FC<Properties> = ({children, title}) => {

    const {track} = useAudioPlayer();
    
    useEffect(() => {
        document.title = `${title} - Folkera`;
    }, [title]);

    return (
        <Box mb={track ? 120 : "xs"}>
            {children}
        </Box>
    )
}

export default Page
