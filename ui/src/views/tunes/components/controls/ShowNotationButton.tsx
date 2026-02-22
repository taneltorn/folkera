import React from "react";
import {Button, Group, Text, useMantineTheme} from '@mantine/core';
import {modals} from '@mantine/modals';
import {Tune} from "../../../../model/Tune.ts";
import MusicXmlViewer from "../../details/components/MusicXmlViewer.tsx";
import {FaItunesNote} from "react-icons/fa";
import {IconSize} from "../../../../utils/mappers.ts";
import {useTranslation} from "react-i18next";
import PlayAudioButton from "../../table/components/controls/PlayAudioButton.tsx";
import {useNavigate} from "react-router-dom";

interface Properties {
    tune: Tune;
}

const ShowNotationButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const open = () =>
        modals.open({
            title: <Group>
                <PlayAudioButton tune={tune}/>
                <Text size={"xl"} fw={"bold"}>{tune.ref}</Text>
            </Group>,
            size: "90%",
            centered: true,
            children: <>
                <MusicXmlViewer tune={tune}/>
                <Button variant={"subtle"}
                        mt={"md"}
                        onClick={handleNavigation}>
                    {t("view.tunes.table.showDetails")}
                </Button>
            </>
        });

    const handleNavigation = () => {
        navigate(`/tunes/${tune.id}`);
        modals.closeAll();
    }

    return (
        <Button
            px={"xs"}
            title={t(`view.tunes.table.${tune.notation ? "showNotation" : "notationNotFound"}`)}
            size={"sm"}
            color={theme.colors.dark[9]}
            variant={"subtle"}
            onClick={open}
            disabled={!tune.musicxml}
        >
            <FaItunesNote
                color={theme.colors.dark[tune.musicxml ? 9 : 1]}
                size={IconSize.get("sm")}
            />
        </Button>
    );
}

export default ShowNotationButton;
