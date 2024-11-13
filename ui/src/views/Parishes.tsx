import React from "react";
import {Box, Text} from "@mantine/core";

const Parishes: React.FC = () => {

    // const [data, setData] = useState<OldRecording[]>([]);
    // const {fetchData} = useDataService();
    // const {fetchStats} = useStatsService();
    //
    // const [stats, setStats] = useState<StatsItem[]>([]);
    // const [layers, setLayers] = useState<any>(null);
    // const [options, setOptions] = useState<MapOptions>(DefaultMapOptions);
    //
    // const navigate = useNavigate();
    //
    // const handleClick = (location: string) => {
    //     navigate(`/`, {
    //         state: {
    //             filters: [{
    //                 field: "location",
    //                 value: location
    //             }]
    //         }
    //     });
    // }
    //
    // useEffect(() => {
    //     fetchData()
    //         .then(setData);
    // }, []);
    //
    // useEffect(() => {
    //     if (isEmpty(data)) {
    //         return;
    //     }
    //     fetchStats(data, {groupBy: "location", dataTransformer: "SplitByComma,CutFromLessThanSign,ParishToCounty"})
    //         .then(r => setStats(r));
    //
    // }, [data]);
    //
    // useEffect(() => {
    //     if (isEmpty(stats)) {
    //         return;
    //     }
    //     fetch(`/maps/kihelkonnad.json`)
    //         .then((response) => response.json())
    //         .then((data) => setLayers(data));
    // }, [stats]);


    return (
        <Box px={"md"}>
            <Text>TODO</Text>
            {/*<Group px={"md"} mb={"md"} style={{zIndex: 22}}>*/}
            {/*    <Switch*/}
            {/*        label="Näita statistikat"*/}
            {/*        checked={options.showCounts}*/}
            {/*        onChange={event => setOptions({...options, showCounts: event.currentTarget.checked})}*/}
            {/*    />*/}

            {/*    <Switch*/}
            {/*        label="As heat map"*/}
            {/*        checked={options.asHeatMap}*/}
            {/*        onChange={event => setOptions({...options, asHeatMap: event.currentTarget.checked})}*/}
            {/*    />*/}

            {/*    <Slider*/}
            {/*        w={400}*/}
            {/*        value={options.heatIntensity}*/}
            {/*        min={0.1}*/}
            {/*        max={0.9}*/}
            {/*        step={0.1}*/}
            {/*        onChange={v => setOptions({...options, heatIntensity: v})}*/}
            {/*    />*/}

            {/*    <Slider*/}
            {/*        w={400}*/}
            {/*        value={options.textSize}*/}
            {/*        min={4}*/}
            {/*        max={20}*/}
            {/*        step={2}*/}
            {/*        onChange={v => setOptions({...options, textSize: v})}*/}
            {/*    />*/}
            {/*</Group>*/}

            {/*<MapTemplate*/}
            {/*    stats={stats}*/}
            {/*    layers={layers}*/}
            {/*    filters={[]}*/}
            {/*    options={options}*/}
            {/*    onClick={handleClick}*/}
            {/*/>*/}
        </Box>
    );
}

export default Parishes;
