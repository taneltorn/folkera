import React from "react";
import {Group, Loader, LoadingOverlay, Text} from "@mantine/core";

interface Properties {
    isLoading: boolean;
    text?: string;
}

const Loading: React.FC<Properties> = ({isLoading, text}) => {

    return (
        <LoadingOverlay
            visible={isLoading}
            loaderProps={{
                children:
                    <Group>
                        <Loader/>
                        {text && <Text>{text}</Text>}
                    </Group>
            }}
        />
    );
}

export default Loading;
