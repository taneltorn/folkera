import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";

interface Properties {
}

const SubmitButton: React.FC<Properties> = () => {

    const {t} = useTranslation();

    return (
        <Button type={"submit"} radius={"xl"}>
            {t("button.save")}
        </Button>
    );
}

export default SubmitButton;
