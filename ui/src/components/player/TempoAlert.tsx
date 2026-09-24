import React from 'react';
import {Tooltip, useMantineTheme} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {IoIosAlert} from "react-icons/io";

interface Properties {
}

const TempoAlert: React.FC<Properties> = () => {

    const {t} = useTranslation();
    const theme = useMantineTheme();

    return (
        <Tooltip label={t("page.player.tooltip.noSpecificTempo")}>
            <IoIosAlert
                color={theme.colors.red[9]}
                size={Size.icon.SM}
            />
        </Tooltip>
    );
}

export default TempoAlert;
