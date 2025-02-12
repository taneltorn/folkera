import React from "react";
import {useTranslation} from "react-i18next";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import {GroupBy} from "../../../../../../domain/GroupBy.ts";

const RecordingMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupBy, setGroupBy} = useStatsContext();

    return (
        <>
            <MenuSelect
                label={t(`view.recordings.map.groupBy.${groupBy}`)}
                options={[
                    GroupBy.PARISH,
                    GroupBy.COUNTY
                ].map(v => ({
                    label: t(`view.recordings.map.groupBy.${v}`),
                    value: v
                }))}
                onChange={v => setGroupBy(v as GroupBy)}
            />
        </>
    );
}

export default RecordingMapControls;
