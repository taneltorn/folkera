import React from "react";
import {useTranslation} from "react-i18next";
import {useMapOptions} from "../../../../hooks/useMapOptions.tsx";
import {MapType} from "../../../../model/MapOptions.ts";
import MenuSelect from "./MenuSelect.tsx";

const MapControls: React.FC = () => {

    const {t} = useTranslation();
    const {options, setOptions} = useMapOptions();

    return (
        <>
            <MenuSelect
                label={t(`view.recordings.map.mapTypeSelection.${options.type}`)}
                options={[
                    MapType.PARISHES,
                    MapType.COUNTIES
                ].map(v => ({
                    label: t(`view.recordings.map.mapTypeSelection.${v}`),
                    value: v
                }))}
                onChange={(v) => setOptions({...options, type: v as MapType})}
            />
        </>
    );
}

export default MapControls;
