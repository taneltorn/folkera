import React from "react";
import {useTranslation} from "react-i18next";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Group} from "@mantine/core";
import ExportStatsCsvButton from "../../components/controls/ExportStatsCsvButton.tsx";

const TuneStatsControls: React.FC = () => {

    const {t} = useTranslation();
    const {totalItems} = useDataContext();
    const {groupsCount, groupBy, setGroupBy} = useStatsContext();

    return (
        <Group gap={4}>
            <LabelValue
                title={t(`view.tunes.stats.tooltip.${groupBy}`)}
                label={t("view.tunes.table.results")}
                value={`${totalItems} (${groupsCount})`}
                mr={"md"}
            />

            <ExportStatsCsvButton/>
            
            <MenuSelect
                label={t(`view.tunes.stats.groupBy.${groupBy}`)}
                options={[
                    GroupBy.YEAR,
                    GroupBy.INSTRUMENT,
                    GroupBy.PARISH,
                    GroupBy.COUNTY,
                    GroupBy.MELODY,
                    GroupBy.PERFORMER,
                    GroupBy.COLLECTOR,
                ].map(v => ({
                    label: t(`view.tunes.stats.groupBy.${v}`),
                    value: v
                }))}
                onChange={(v) => setGroupBy(v as GroupBy)}
            />
        </Group>
    );
}

export default TuneStatsControls;
