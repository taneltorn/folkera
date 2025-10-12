import React from "react";
import {useTranslation} from "react-i18next";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Group} from "@mantine/core";
import ExportStatsCsvButton from "../../components/controls/ExportStatsCsvButton.tsx";

const RecordingStatsControls: React.FC = () => {

    const {t} = useTranslation();
    const {totalItems} = useDataContext();
    const {groupsCount, groupBy, setGroupBy} = useStatsContext();

    return (
        <Group gap={4}>
            <LabelValue
                title={t(`view.recordings.stats.tooltip.${groupBy}`)}
                label={t("view.recordings.table.results")}
                value={`${totalItems} (${groupsCount})`}
                mr={"md"}
            />

            <ExportStatsCsvButton/>
            
            <MenuSelect
                label={t(`view.recordings.stats.groupBy.${groupBy}`)}
                options={[
                    GroupBy.YEAR,
                    GroupBy.INSTRUMENT,
                    GroupBy.PARISH,
                    GroupBy.COUNTY,
                    GroupBy.TUNE,
                    GroupBy.PERFORMER,
                    GroupBy.COLLECTOR,
                ].map(v => ({
                    label: t(`view.recordings.stats.groupBy.${v}`),
                    value: v
                }))}
                onChange={(v) => setGroupBy(v as GroupBy)}
            />
        </Group>
    );
}

export default RecordingStatsControls;
