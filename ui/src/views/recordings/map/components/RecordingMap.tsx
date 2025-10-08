import React, {useEffect, useState} from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import MapTemplate from "../../../../components/MapTemplate.tsx";
import {useActiveView} from "../../../../hooks/useActiveView.tsx";
import {View} from "../../../../context/ActiveViewContext.tsx";
import {useMapContext} from "../../../../hooks/useMapContext.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";

const RecordingMap: React.FC = () => {

    const {addFilter} = useDataContext();
    const {setActiveView} = useActiveView();
    const {stats, groupBy, mapOptions} = useMapContext();
    const [layers, setLayers] = useState<any>(null);

    const handleClick = (location: string) => {
        const filter = groupBy === GroupBy.COUNTY ? GroupBy.COUNTY: GroupBy.PARISH;
        addFilter({field: filter, value: location});
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
