import React from "react";
import {useTranslation} from "react-i18next";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import SimpleMenu from "../../../../components/SimpleMenu.tsx";
import LabelValue from "../../../../components/LabelValue.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Group} from "@mantine/core";
import ExportStatsCsvButton from "../../components/controls/ExportStatsCsvButton.tsx";
import {FaRegChartBar} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";

const TuneStatsControls: React.FC = () => {

    const {t} = useTranslation();
    const {totalItems} = useDataContext();
    const {groupsCount, groupBy, setGroupBy} = useStatsContext();

    return (
        <Group gap={4}>
            <LabelValue
                title={t(`page.tunes.stats.tooltip.${groupBy}`)}
                label={t("page.tunes.table.results")}
                value={`${totalItems} (${groupsCount})`}
                mr={"md"}
            />

            <ExportStatsCsvButton/>

            <SimpleMenu
                label={t(`page.tunes.stats.groupBy.${groupBy}`)}
                value={groupBy}
                leftSection={<FaRegChartBar size={Size.icon.SM}/>}
                options={[
                    GroupBy.YEAR,
                    GroupBy.INSTRUMENT,
                    GroupBy.PARISH,
                    GroupBy.COUNTY,
                    GroupBy.MELODY,
                    GroupBy.PERFORMER,
                    GroupBy.COLLECTOR,
                ].map(v => ({
                    label: t(`page.tunes.stats.groupBy.${v}`),
                    value: v
                }))}
                onChange={(v) => setGroupBy(v as GroupBy)}
            />
        </Group>
    );
}

export default TuneStatsControls;
