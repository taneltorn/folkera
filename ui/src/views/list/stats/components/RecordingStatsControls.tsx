import React from "react";
import {useTranslation} from "react-i18next";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {GroupBy} from "../../../../../../domain/GroupBy.ts";
import {ChartType} from "../../../../model/ChartType.ts";

const RecordingStatsControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupsCount, chartType, setChartType, groupBy, setGroupBy} = useStatsContext();

    return (
        <>
            <LabelValue label={t(`view.recordings.stats.groups.${groupBy}`)} value={groupsCount} props={{mx: "md"}}/>
            
            <MenuSelect
                label={t(`view.recordings.stats.groupBy.${groupBy}`)}
                options={[
                    GroupBy.YEAR,
                    GroupBy.INSTRUMENT,
                    GroupBy.PARISH,
                    GroupBy.TUNE,
                ].map(v => ({
                    label: t(`view.recordings.stats.groupBy.${v}`),
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

export default RecordingStatsControls;
