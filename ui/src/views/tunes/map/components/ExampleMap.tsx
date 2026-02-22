import React, {useEffect, useState} from "react";
import MapTemplate from "../../../../components/MapTemplate.tsx";
import {GroupBy} from "../../../../model/GroupBy.ts";
import {MapOptions} from "../../../../model/MapOptions.ts";

const ExampleMap: React.FC = () => {

    const [stats, setStats] = useState<{ [key: string]: number }[]>([]);
    const [layers, setLayers] = useState<any>(null);

    const mapOptions: MapOptions = {
        showLabels: false,
        showCounts: true,
        textSize: 14,
        asHeatMap: true,
        heatIntensity: 0,
        position: {
            coords: [58.61692230040431, 25.29367844509054],
            zoom: 8
        }
    }
    
    const handleClick = (feature: any) => {
        alert(feature)
    }
    
    useEffect(() => {
        fetch(`/map-layers/example-stats.json`)
            .then((response) => response.json())
            .then(stats => setStats(stats))
    }, []);

    useEffect(() => {
        setLayers(null)
        fetch(`/map-layers/parish.json`)
            .then(response => response.json())
            .then((data) => setLayers(data));
    }, [stats]);

    return (
        <>
            {layers && stats &&
                <MapTemplate
                    stats={stats}
                    layers={layers}
                    groupBy={GroupBy.PARISH}
                    options={mapOptions}
                    onClick={handleClick}
                    // valueCap={80}
                />}
        </>
    );
}

export default ExampleMap;
