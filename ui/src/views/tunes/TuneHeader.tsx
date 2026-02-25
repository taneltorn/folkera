import React from "react";
import {Tune} from "../../model/Tune.ts";
import {Button, Group} from "@mantine/core";
import TuneReference from "./TuneReference.tsx";
import NextTuneButton from "./components/controls/NextTuneButton.tsx";
import PreviousTuneButton from "./components/controls/PreviousTuneButton.tsx";
import {useTranslation} from "react-i18next";
import {PiCaretLeftBold} from "react-icons/pi";
import {Size} from "../../utils/constants.ts";
import {useNavigate} from "react-router-dom";

interface Properties {
    tune: Tune;
}

const TuneHeader: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <Group justify={"space-between"} mb={"md"}>
            <Group wrap={"nowrap"}>
                <Button
                    px={"xs"}
                    size={"sm"}
                    title={t("view.tunes.details.back")}
                    variant={"subtle"}
                    color={"dark"}
                    onClick={() => navigate("/")}
                >
                    <PiCaretLeftBold size={Size.icon.LG}/>
                </Button>
                <TuneReference tune={tune}/>
            </Group>

            <Group gap={4} wrap={"nowrap"}>
                <PreviousTuneButton tune={tune}/>
                <NextTuneButton tune={tune}/>
            </Group>
        </Group>
    );
}

export default TuneHeader;
