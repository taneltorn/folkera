import React from "react";
import {Flex, Loader, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";

interface Properties {
    isLoading: boolean;
    text?: string;
    hideText?: boolean;
    children: React.ReactNode;
}

const LoadingOverlay: React.FC<Properties> = ({isLoading, text, hideText, children}) => {

    const {t} = useTranslation();

    return (
        <div style={{position: 'relative'}}>
            {isLoading &&
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 1,
                    }}
                >
                    <Loader/>{!hideText && <Text ml={"md"}>{text || t("page.loading")}</Text>}
                </Flex>}
            {children}
        </div>
    );
}

export default LoadingOverlay;
