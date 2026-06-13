import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";

interface Properties {
    onClick: () => void;
}

const CancelButton: React.FC<Properties> = ({onClick}) => {

    const {t} = useTranslation();

    return (
        <Button
            type={"button"}
            radius={"xl"}
            color={"gray"}
            variant={"subtle"}
            onClick={onClick}
        >
            {t("button.cancel")}
        </Button>
    );
}

export default CancelButton;
