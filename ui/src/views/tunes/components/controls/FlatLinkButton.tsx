import React from "react";
import {Button} from '@mantine/core';
import {Tune} from "../../../../model/Tune.ts";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface Properties {
    tune: Tune;
    children?: React.ReactNode;
}

const FlatLinkButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();

    return (
        <Link to={tune.flatLink || ""} target="_blank" rel="noopener noreferrer">
            <Button
                size={"sm"}
                color={"dark.9"}
                radius={"xl"}
                variant={"subtle"}
                leftSection={<img height={20} width={20} src={"/flat.png"} alt={"flat.png"}/>}
            >
                {t("button.openInFlat")}
            </Button>
        </Link>
    );
}

export default FlatLinkButton;
