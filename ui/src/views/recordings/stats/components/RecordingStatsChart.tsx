import React, {useRef} from 'react';
import {Bar} from 'react-chartjs-2';
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
import {useStatsContext} from "../../../../hooks/useStatsContext.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ChartProps {
    onElementClick?: (label: string, value?: any) => void;
}

const RecordingStatsChart: React.FC<ChartProps> = ({onElementClick}) => {

    const chartRef = useRef(null);
    const theme = useMantineTheme();
    const {stats} = useStatsContext();

    const labels = Object.keys(stats);
    const values = Object.values(stats);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: theme.colors.red[9],
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
                display: false
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
        <Bar
            ref={chartRef}
            data={chartData}
            options={options}
        />
    )
};

export default RecordingStatsChart;
