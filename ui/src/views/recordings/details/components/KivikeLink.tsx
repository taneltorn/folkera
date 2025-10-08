import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Tooltip} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import {FaExternalLinkAlt} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    recording: Recording;
}

const KIVIKE_PID_URL = import.meta.env.VITE_KIVIKE_PID_URL;

const KivikeLink: React.FC<Properties> = ({recording}) => {

    const {t} = useTranslation();

    return (
        <Tooltip label={t(`view.recordings.details.${recording.pid ? "openInKivike" : "pidMissing"}`)} withArrow>
            <Button
                component="a"
                href={recording.pid ? `${KIVIKE_PID_URL}${recording.pid}` : undefined}
                target="blank"
                variant="subtle"
                color={"dark"}
                size={"compact-md"}
                disabled={!recording.pid}
            >
                <FaExternalLinkAlt size={Size.icon.XS}/>
            </Button>

        </Tooltip>
    );
}

export default KivikeLink;
