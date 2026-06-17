import React from "react";
import {useTranslation} from "react-i18next";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {Group} from "@mantine/core";
import LabelValue from "../../../../components/LabelValue.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import SimpleMenu from "../../../../components/SimpleMenu.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {Size} from "../../../../utils/constants.ts";
import {FaMap} from "react-icons/fa";
import SelectMapLayersButton from "./SelectMapLayersButton.tsx";

const TuneMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupBy, setGroupBy} = useMapContext();
    const {totalItems} = useDataContext();

    return (
        <Group gap={4}>
            <LabelValue
                label={t("page.tunes.table.results")}
                value={totalItems}
                mr={"md"}
            />

            <SelectMapLayersButton/>

            <SimpleMenu
                label={t(`page.tunes.map.groupBy.${groupBy}`)}
                value={groupBy}
                icon={<FaMap size={Size.icon.SM}/>}
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
