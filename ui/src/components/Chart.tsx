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
import {ChartType, StatsItem} from "../model/Stats.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ChartProps {
    data: StatsItem[];
    chartType: ChartType;
    onElementClick?: (label: string, value?: any) => void;
}

const Colors = [
    "red", "cyan", "yellow",
    "lime", "violet", "teal",
    "orange", "blue", "grape",
    "green", "indigo", "pink"
];

const ChartComponent: React.FC<ChartProps> = ({data, chartType, onElementClick}) => {

    const chartRef = useRef(null);
    const theme = useMantineTheme();

    const filtered = chartType === ChartType.BAR ?  data: Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value > 0)
    );

    const labels = Object.keys(filtered);
    const values = Object.values(filtered);

    const generateColorsArray = (): string[] => {
        const colors: string[] = [];

        for (let i = 9; i > 4; i = i - 2) {
            Colors.forEach(c => {
                colors.push(theme.colors[c][i]);
            })
        }
        return colors;
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: chartType === ChartType.BAR ? theme.colors.red[9] : generateColorsArray(),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 300
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

    return chartType === ChartType.BAR ? (
        <Bar ref={chartRef} height={100} data={chartData} options={options}/>
    ) : (
        <Pie ref={chartRef} height={100} width={100} data={chartData} options={options}/>
    );
};

export default ChartComponent;
