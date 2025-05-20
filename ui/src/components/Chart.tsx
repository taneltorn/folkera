import React, {useRef} from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {useMantineTheme} from "@mantine/core";
import chroma from "chroma-js";
import {useStatsContext} from "../hooks/useStatsContext.tsx";
import {ChartType} from "../model/ChartType.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ChartProps {
    onElementClick?: (label: string, value?: any) => void;
}

const ChartComponent: React.FC<ChartProps> = ({onElementClick}) => {

    const {stats, chartType} = useStatsContext();

    const chartRef = useRef(null);
    const theme = useMantineTheme();

    const filtered = chartType === ChartType.BAR ? stats : Object.fromEntries(
        // @ts-ignore
        Object.entries(stats).filter(([_, value]) => value > 0)
    );

    const labels = Object.keys(filtered);
    const values = Object.values(filtered);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: chartType === ChartType.BAR ? theme.colors.red[9] : chroma.scale("YlGnBu").colors(values.length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 150
        },
        plugins: {
            legend: {
                position: "bottom",
                // display: false
                display: chartType === ChartType.PIE
            }
        },
        onClick: (_: any, elements: any) => {
            if (elements.length > 0) {
                const {datasetIndex, index} = elements[0];
                const label = chartData.labels[index];
                const value = chartData.datasets[datasetIndex].data[index];

                onElementClick && onElementClick(label, value);
            }
        },
    };

    return (
        chartType === ChartType.BAR
            // @ts-ignore
            ? <Bar ref={chartRef} height={150} data={chartData} options={options}/>
            // @ts-ignore
            : <Pie ref={chartRef} height={100} width={100} data={chartData} options={options}/>
    )
};

export default ChartComponent;
