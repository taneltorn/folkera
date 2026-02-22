import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Button, Group, Menu, Slider, Switch} from "@mantine/core";
import LabelValue from "../../../../components/LabelValue.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {Size} from "../../../../utils/constants.ts";
import {FaLayerGroup} from "react-icons/fa";

const TuneMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {mapOptions, setMapOptions, groupBy, setGroupBy} = useMapContext();
    const {totalItems} = useDataContext();

    return (
        <Group gap={4}>
            <LabelValue
                label={t("view.tunes.table.results")}
                value={totalItems}
                mr={"md"}
            />

            <Menu shadow="md" closeOnClickOutside={true} closeOnItemClick={false}>
                <Menu.Target>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        leftSection={<FaLayerGroup size={Size.icon.SM} />}
                    >
                        {t("view.tunes.controls.mapOptions")}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Switch
                            label={t(`view.tunes.map.showLabels`)}
                            checked={mapOptions.showLabels}
                            onClick={() => setMapOptions({...mapOptions, showLabels: !mapOptions.showLabels})}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Switch
                            label={t(`view.tunes.map.showCounts`)}
                            checked={mapOptions.showCounts}
                            onClick={() => setMapOptions({...mapOptions, showCounts: !mapOptions.showCounts})}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Slider
                            w={150}
                            label={t(`view.tunes.map.textSize`)}
                            value={mapOptions.textSize}
                            min={8}
                            max={18}
                            onChange={v => setMapOptions({...mapOptions, textSize: v})}
                        />
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <MenuSelect
                label={t(`view.tunes.map.groupBy.${groupBy}`)}
                options={[
                    GroupBy.PARISH,
                    GroupBy.COUNTY,
                ].map(v => ({
                    label: t(`view.tunes.map.groupBy.${v}`),
                    value: v
                }))}
                onChange={v => setGroupBy(v as GroupBy)}
            />
        </Group>
    );
}

export default TuneMapControls;
