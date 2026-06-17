import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Button} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {FaLayerGroup} from "react-icons/fa";
import AdvancedMenu from "../../../../components/AdvancedMenu.tsx";
import CheckMark from "../../../../components/CheckMark.tsx";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const SelectMapLayersButton: React.FC = () => {

    const {t} = useTranslation();
    const {mapOptions, setMapOptions} = useMapContext();
    const bp = useCurrentBreakpoint();

    const icon = <FaLayerGroup size={Size.icon.SM}/>;

    return (
        <AdvancedMenu
            target={
                <Button
                    title={t("page.tunes.controls.mapOptions")}
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark.9"}
                    leftSection={bp !== "xxs" && icon}
                >
                    {bp === "xxs" ? icon : t("page.tunes.controls.mapOptions")}
                </Button>}
            closeOnItemClick={false}
            items={[
                {
                    label: t(`page.tunes.map.showLabels`),
                    value: "showLabels",
                    rightSection: <CheckMark show={mapOptions.showLabels}/>,
                    onClick: () => setMapOptions({...mapOptions, showLabels: !mapOptions.showLabels})
                }, {
                    label: t(`page.tunes.map.showCounts`),
                    value: "showCounts",
                    rightSection: <CheckMark show={mapOptions.showCounts}/>,
                    onClick: () => setMapOptions({...mapOptions, showCounts: !mapOptions.showCounts})
                },
            ]}
        />
    );
}

export default SelectMapLayersButton;
