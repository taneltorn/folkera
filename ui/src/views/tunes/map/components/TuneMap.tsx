import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import MapTemplate from "../../../../components/MapTemplate.tsx";
import {useActiveView} from "../../../../hooks/useActiveView.tsx";
import {View} from "../../../../context/ActiveViewContext.tsx";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {Box} from "@mantine/core";
import Loading from "../../../../components/Loading.tsx";
import {useTranslation} from "react-i18next";

const TuneMap: React.FC = () => {

    const {t} = useTranslation();

    const {addFilter} = useDataContext();
    const {setActiveView} = useActiveView();
    const {stats, groupBy, mapOptions, isLoading, layers} = useMapContext();

    const handleClick = (location: string) => {
        const filter = groupBy === GroupBy.COUNTY ? GroupBy.COUNTY : GroupBy.PARISH;
        addFilter({field: filter, value: location});
        setActiveView(View.TABLE);
    }


    return (
        <Box px={"md"} pos={"relative"}>
            {layers &&
                <MapTemplate
                    stats={stats}
                    layers={layers}
                    groupBy={groupBy}
                    options={mapOptions}
                    onClick={handleClick}
                />}
            <Loading isLoading={isLoading} text={t("loading.data")}/>
        </Box>
    );
}

export default TuneMap;
