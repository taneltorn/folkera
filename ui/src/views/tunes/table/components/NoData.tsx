import React from "react";
import {Center, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";

interface Properties {
    show: boolean;
}

const TunesTable: React.FC<Properties> = ({show}) => {

    const {t} = useTranslation();

    return (<>
        {show &&
            <Center py={"md"}>
                <Text size={"sm"}>
                    {t("data.noResults")}
                </Text>
            </Center>}
    </>);
}

export default TunesTable;
