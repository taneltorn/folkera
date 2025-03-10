import React from "react";
import {useTranslation} from "react-i18next";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Group, Slider, Switch} from "@mantine/core";

const RecordingMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupBy, setGroupBy, mapOptions, setMapOptions} = useMapContext();

    return (
        <Group gap={"md"}>
            <MenuSelect
                label={t(`view.recordings.map.groupBy.${groupBy}`)}
                options={[
                    GroupBy.PARISH,
                ].map(v => ({
                    label: t(`view.recordings.map.groupBy.${v}`),
                    value: v
                }))}
                onChange={v => setGroupBy(v as GroupBy)}
            />

            <Group gap={"md"}>
                <Switch
                    label={t(`view.recordings.map.showLabels`)}
                    checked={mapOptions.showLabels}
                    onClick={() => setMapOptions({...mapOptions, showLabels: !mapOptions.showLabels})}
                />
                <Switch
                    label={t(`view.recordings.map.showCounts`)}
                    checked={mapOptions.showCounts}
                    onClick={() => setMapOptions({...mapOptions, showCounts: !mapOptions.showCounts})}
                />
                <Slider
                    w={150}
                    label={t(`view.recordings.map.textSize`)}
                    value={mapOptions.textSize}
                    min={8}
                    max={18}
                    onChange={v => setMapOptions({...mapOptions, textSize: v})}
                />
            </Group>
        </Group>
    );
}

export default RecordingMapControls;
