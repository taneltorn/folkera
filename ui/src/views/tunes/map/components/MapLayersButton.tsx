import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import SimpleMenu from "../../../../components/SimpleMenu.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {Size} from "../../../../utils/constants.ts";
import {FaLayerGroup} from "react-icons/fa";

const MapLayersButton: React.FC = () => {

    const {t} = useTranslation();
    const {groupBy, setGroupBy} = useMapContext();

    return (
        <SimpleMenu
            label={t(`page.tunes.map.groupBy.${groupBy}`)}
            value={groupBy}
            leftSection={<FaLayerGroup size={Size.icon.SM}/>}
            options={[
                GroupBy.PARISH,
                GroupBy.COUNTY,
            ].map(v => ({
                label: t(`page.tunes.map.groupBy.${v}`),
                value: v
            }))}
            onChange={v => setGroupBy(v as GroupBy)}
        />
    );
}

export default MapLayersButton;
