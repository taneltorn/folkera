import React from "react";
import {Button} from '@mantine/core';
import {useTranslation} from "react-i18next";

interface Properties {
    isLoading?: boolean;
}

const SubmitButton: React.FC<Properties> = ({isLoading}) => {

    const {t} = useTranslation();

    return (
        <Button type={"submit"} radius={"xl"} loading={isLoading}>
            {t("button.save")}
        </Button>
    );
}

export default SubmitButton;
