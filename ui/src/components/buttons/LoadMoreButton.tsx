import React from "react";
import {Button, Center} from "@mantine/core";
import {useTranslation} from "react-i18next";

interface Properties {
    visible?: boolean;
    onClick: () => void;
}

const LoadMoreButton: React.FC<Properties> = ({visible, onClick}) => {

    const {t} = useTranslation();

    return (
        <>
            {visible &&
                <Center mt={"md"}>
                    <Button
                        variant={"subtle"}
                        onClick={onClick}
                    >
                        {t("page.loadMore")}
                    </Button>
                </Center>}
        </>

    );
};

export default LoadMoreButton;
