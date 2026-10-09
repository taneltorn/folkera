import React from "react";
import {Button, Group} from "@mantine/core";
import {ItemsPerPageOptions} from "../../utils/lists.ts";
import {useTranslation} from "react-i18next";


interface Properties {
    pageSize: number;
    onChange: (value: number) => void;
}

const PageSizeSelector: React.FC<Properties> = ({pageSize, onChange}) => {

    const {t} = useTranslation();

    return (
        <Group gap={"xs"}>
            {ItemsPerPageOptions.map(it => (
                <Button
                    key={it}
                    size={"xs"}
                    title={t("pagination.itemsPerPage")}
                    px={7}
                    h={26}
                    color={it === pageSize ? "dark" : "dark"}
                    variant={it === pageSize ? "filled" : "transparent"}
                    style={{border: "none"}}
                    onClick={() => onChange(it)}
                >
                    {it}
                </Button>))}
        </Group>
    );
}

export default PageSizeSelector;
