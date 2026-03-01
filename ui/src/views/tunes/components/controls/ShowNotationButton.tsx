import React from "react";
import {Button, Group, useMantineTheme} from '@mantine/core';
import {modals} from '@mantine/modals';
import {Tune} from "../../../../model/Tune.ts";
import MusicXmlViewer from "../../details/components/MusicXmlViewer.tsx";
import {FaItunesNote} from "react-icons/fa";
import {IconSize} from "../../../../utils/mappers.ts";
import {useTranslation} from "react-i18next";
import PlayAudioButton from "../../table/components/controls/PlayAudioButton.tsx";
import {useNavigate} from "react-router-dom";
import ModalTitle from "./ModalTitle.tsx";
import {Size} from "../../../../utils/constants.ts";
import {RiArrowRightDoubleFill} from "react-icons/ri";

interface Properties {
    tune: Tune;
}

const ShowNotationButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const open = () =>
        modals.open({
            title: <ModalTitle title={tune.ref}/>,
            size: "90%",
            centered: true,
            children: <>
                <MusicXmlViewer tune={tune}/>
                <Group gap={"xs"} mt={"md"}>
                    <PlayAudioButton tune={tune}/>
                    <Button
                        color={"dark"}
                        variant={"subtle"}
                        leftSection={<RiArrowRightDoubleFill size={Size.icon.MD}/>}
                        onClick={handleNavigation}>
                        {t("page.tunes.table.showDetails")}
                    </Button>
                </Group>
            </>
        });

    const handleNavigation = () => {
        navigate(`/tunes/${tune.id}`);
        modals.closeAll();
    }

    return (
        <Button
            px={"xs"}
            title={t(`page.tunes.table.${tune.notation ? "showNotation" : "notationNotFound"}`)}
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
