import React from "react";
import {useTranslation} from "react-i18next";
import {Group} from "@mantine/core";
import LabelValue from "../../../../components/LabelValue.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import MapSettingsButton from "./MapSettingsButton.tsx";
import MapLayersButton from "./MapLayersButton.tsx";

const TuneMapControls: React.FC = () => {

    const {t} = useTranslation();
    const {totalItems} = useDataContext();

    return (
        <Group gap={4}>
            <LabelValue
                label={t("page.tunes.table.results")}
                value={totalItems}
                mr={"md"}
            />

            <MapSettingsButton/>
            <MapLayersButton/>
        </Group>
    );
}

export default TuneMapControls;
