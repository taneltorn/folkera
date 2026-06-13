import React from "react";
import {useTranslation} from "react-i18next";
import {CloseButton} from "@mantine/core";

interface Properties {
    show: boolean;
    onClick?: () => void;
}

const ClearIcon: React.FC<Properties> = ({show, onClick}) => {

    const {t} = useTranslation();

    const handleClear = () => {
        onClick && onClick();
    }

    return (
        <CloseButton
            variant={"transparent"}
            title={t(`button.clear`)}
            style={{display: show ? undefined : 'none'}}
            onClick={handleClear}
        />
    );
}

export default ClearIcon;
