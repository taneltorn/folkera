import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Button, Group, Menu, Slider, Switch} from "@mantine/core";
import LabelValue from "../../../../components/LabelValue.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";

const RecordingMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {mapOptions, setMapOptions, groupBy, setGroupBy} = useMapContext();
    const {totalItems} = useDataContext();

    return (
        <Group gap={4}>
            <LabelValue
                label={t("view.recordings.table.results")}
                value={totalItems}
                mr={"md"}
            />

            <MenuSelect
                label={t(`view.recordings.map.groupBy.${groupBy}`)}
                options={[
                    GroupBy.PARISH,
                    GroupBy.COUNTY,
                ].map(v => ({
                    label: t(`view.recordings.map.groupBy.${v}`),
                    value: v
                }))}
                onChange={v => setGroupBy(v as GroupBy)}
            />

            <Menu shadow="md" closeOnClickOutside={true} closeOnItemClick={false}>
                <Menu.Target>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        rightSection={<RiArrowDropDownLine size={Size.icon.LG} />}
                    >
                        {t("view.recordings.controls.mapOptions")}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Switch
                            label={t(`view.recordings.map.showLabels`)}
                            checked={mapOptions.showLabels}
                            onClick={() => setMapOptions({...mapOptions, showLabels: !mapOptions.showLabels})}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Switch
                            label={t(`view.recordings.map.showCounts`)}
                            checked={mapOptions.showCounts}
                            onClick={() => setMapOptions({...mapOptions, showCounts: !mapOptions.showCounts})}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Slider
                            w={150}
                            label={t(`view.recordings.map.textSize`)}
                            value={mapOptions.textSize}
                            min={8}
                            max={18}
                            onChange={v => setMapOptions({...mapOptions, textSize: v})}
                        />
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default RecordingMapControls;
