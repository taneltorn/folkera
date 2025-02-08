import React from "react";
import {useTranslation} from "react-i18next";
import {useStats} from "../../../../hooks/useStats.tsx";
import {ChartType, GroupBy} from "../../../../model/Stats.ts";
import MenuSelect from "./MenuSelect.tsx";
import LabelValue from "./LabelValue.tsx";

const StatsControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupsCount, chartType, setChartType, groupBy, setGroupBy} = useStats();

    return (
        <>
            <LabelValue label={t(`view.recordings.stats.groups.${groupBy}`)} value={groupsCount} props={{mx: "md"}}/>
            
            <MenuSelect
                label={t(`view.recordings.stats.${groupBy}`)}
                options={[
                    GroupBy.GROUP_BY_YEAR,
                    GroupBy.GROUP_BY_INSTRUMENT,
                    GroupBy.GROUP_BY_PARISH,
                    GroupBy.GROUP_BY_TUNE,
                ].map(v => ({
                    label: t(`view.recordings.stats.${v}`),
                    value: v
                }))}
                onChange={(v) => setGroupBy(v as GroupBy)}
            />

            <MenuSelect
                label={t(`view.recordings.stats.${chartType}`)}
                options={[
                    ChartType.BAR,
                    ChartType.PIE,
                ].map(v => ({
                    label: t(`view.recordings.stats.${v}`),
                    value: v
                }))}
                onChange={(v) => setChartType(v as ChartType)}
            />
        </>
    );
}

export default StatsControls;
