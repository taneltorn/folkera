import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";

interface Properties {
    isLoading?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

const SaveButton: React.FC<Properties> = (props) => {

    const {t} = useTranslation();

    return (
        <Button
            type={"button"}
            radius={"xl"}
            {...props}
        >
            {t("button.save")}
        </Button>
    );
}

export default SaveButton;
