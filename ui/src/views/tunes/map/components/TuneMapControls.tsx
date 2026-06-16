import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Button, Group} from "@mantine/core";
import LabelValue from "../../../../components/LabelValue.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import SimpleMenu from "../../../../components/SimpleMenu.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {Size} from "../../../../utils/constants.ts";
import {FaLayerGroup} from "react-icons/fa";
import AdvancedMenu from "../../../../components/AdvancedMenu.tsx";
import CheckMark from "../../../../components/CheckMark.tsx";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const TuneMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {mapOptions, setMapOptions, groupBy, setGroupBy} = useMapContext();
    const {totalItems} = useDataContext();
    const bp = useCurrentBreakpoint();

    const icon = <FaLayerGroup size={Size.icon.SM}/>;

    return (
        <Group gap={4}>
            <LabelValue
                label={t("page.tunes.table.results")}
                value={totalItems}
                mr={"md"}
            />

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

            <SimpleMenu
                label={t(`page.tunes.map.groupBy.${groupBy}`)}
                value={groupBy}
                options={[
                    GroupBy.PARISH,
                    GroupBy.COUNTY,
                ].map(v => ({
                    label: t(`page.tunes.map.groupBy.${v}`),
                    value: v
                }))}
                onChange={v => setGroupBy(v as GroupBy)}
            />
        </Group>
    );
}

export default TuneMapControls;
