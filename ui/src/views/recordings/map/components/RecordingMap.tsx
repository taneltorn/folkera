import React, {useEffect, useState} from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import MapTemplate from "../../../../components/MapTemplate.tsx";
import {useActiveView} from "../../../../hooks/useActiveView.tsx";
import {View} from "../../../../context/ActiveViewContext.tsx";
import {CountyToParishMap} from "../../../../utils/location.mappings.ts";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";

const RecordingMap: React.FC = () => {

    const {addFilter} = useDataContext();
    const {setActiveView} = useActiveView();
    const {stats, groupBy, mapOptions} = useMapContext();
    const [layers, setLayers] = useState<any>(null);

    const handleClick = (location: string) => {
        addFilter("parish", groupBy === GroupBy.COUNTY ? CountyToParishMap.get(location) || [] : [location]);
        setActiveView(View.TABLE);
    }

    useEffect(() => {
        setLayers(null)
        fetch(`/map-layers/${groupBy}.json`)
            .then(response => response.json())
            .then((data) => {
                setLayers(data);
            });
    }, [groupBy]);

    return (
        <>
            {layers &&
                <MapTemplate
                    stats={stats}
                    layers={layers}
                    groupBy={groupBy}
                    options={mapOptions}
                    onClick={handleClick}
                />}
        </>
    );
}

export default RecordingMap;
