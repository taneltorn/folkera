import React from "react";
import {useTranslation} from "react-i18next";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";

const RecordingStatsControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupsCount, groupBy, setGroupBy} = useStatsContext();
    const {totalItems} = useDataContext();

    return (
        <>
            <LabelValue label={t("view.recordings.table.results")} value={`${totalItems} (${groupsCount})`}/>

            <MenuSelect
                label={t(`view.recordings.stats.groupBy.${groupBy}`)}
                options={[
                    GroupBy.YEAR,
                    GroupBy.INSTRUMENT,
                    GroupBy.PARISH,
                    GroupBy.TUNE,
                    GroupBy.PERFORMER,
                ].map(v => ({
                    label: t(`view.recordings.stats.groupBy.${v}`),
                    value: v
                }))}
                onChange={(v) => setGroupBy(v as GroupBy)}
            />

            {/*<MenuSelect*/}
            {/*    label={t(`view.recordings.stats.${chartType}`)}*/}
            {/*    options={[*/}
            {/*        ChartType.BAR,*/}
            {/*    ].map(v => ({*/}
            {/*        label: t(`view.recordings.stats.${v}`),*/}
            {/*        value: v*/}
            {/*    }))}*/}
            {/*    onChange={(v) => setChartType(v as ChartType)}*/}
            {/*/>*/}
        </>
    );
}

export default RecordingStatsControls;
