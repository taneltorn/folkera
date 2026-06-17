import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Size} from "../../../../utils/constants.ts";
import AdvancedMenu from "../../../../components/AdvancedMenu.tsx";
import CheckMark from "../../../../components/CheckMark.tsx";
import {MdTextFields} from "react-icons/md";

const MapSettingsButton: React.FC = () => {

    const {t} = useTranslation();
    const {mapOptions, setMapOptions} = useMapContext();

    return (
        <AdvancedMenu
            target={t("page.tunes.controls.mapOptions")}
            closeOnItemClick={false}
            leftSection={<MdTextFields size={Size.icon.MD}/>}
            items={[
                {
                    label: t("page.tunes.map.showLabels"),
                    value: "showLabels",
                    rightSection: <CheckMark show={mapOptions.showLabels}/>,
                    onClick: () =>
                        setMapOptions({
                            ...mapOptions,
                            showLabels: !mapOptions.showLabels,
                        }),
                },
                {
                    label: t("page.tunes.map.showCounts"),
                    value: "showCounts",
                    rightSection: <CheckMark show={mapOptions.showCounts}/>,
                    onClick: () =>
                        setMapOptions({
                            ...mapOptions,
                            showCounts: !mapOptions.showCounts,
                        }),
                },
            ]}
        />
    );
};

export default MapSettingsButton;
