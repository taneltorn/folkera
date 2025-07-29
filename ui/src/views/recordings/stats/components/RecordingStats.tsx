import React, {useEffect} from "react";
import {useStatsService} from "../../../../services/useStatsService.ts";
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {useActiveView} from "../../../../hooks/useActiveView.tsx";
import {View} from "../../../../context/ActiveViewContext.tsx";
import Chart from "../../../../components/Chart.tsx";

interface Properties {
}

const StatsView: React.FC<Properties> = () => {

    const {setStats, groupBy} = useStatsContext();
    const {fetchStats} = useStatsService();
    const {data, filters, addFilter} = useDataContext();
    const {setActiveView} = useActiveView();

    const handleClick = (label: string) => {
        addFilter(groupBy, label);
        setActiveView(View.TABLE);
    }

    useEffect(() => {
        fetchStats(filters, groupBy).then(r => setStats(r));
    }, [data, groupBy]);

    return (
        <Chart onElementClick={handleClick}/>
    );
}

export default StatsView;
