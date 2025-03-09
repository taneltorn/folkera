import React from "react";
import {useTranslation} from "react-i18next";
import MenuSelect from "../../../../components/MenuSelect.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";

const RecordingMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {groupBy, setGroupBy} = useMapContext();

    return (
        <>
            <MenuSelect
                label={t(`view.recordings.map.groupBy.${groupBy}`)}
                options={[
                    GroupBy.PARISH,
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
