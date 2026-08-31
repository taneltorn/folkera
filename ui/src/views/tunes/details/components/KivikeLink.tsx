import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Group, Tooltip} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import {FaExternalLinkAlt} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    tune: Tune;
}

const KIVIKE_PID_URL = import.meta.env.VITE_KIVIKE_PID_URL;

const KivikeLink: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();

    return (
        <Tooltip label={t(`page.tunes.details.${tune.pid ? "openInKivike" : "pidMissing"}`)} withArrow>
            <Button
                component="a"
                px={0}
                href={tune.pid ? `${KIVIKE_PID_URL}${tune.pid}` : undefined}
                target="blank"
                variant={"transparent"}
                size={"sm"}
                disabled={!tune.pid}
            >
                <Group>
                    {tune.pid}
                    <FaExternalLinkAlt size={Size.icon.XS}/>
                </Group>
            </Button>

        </Tooltip>
    );
}

export default KivikeLink;
