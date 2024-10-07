import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {useMantineTheme} from "@mantine/core";
import {hex2rgba} from "../utils/common.helpers.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    data: Map<string, number>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {

    const theme = useMantineTheme();

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Value per Year',
                data: values, // y-axis data (values)
                backgroundColor: hex2rgba( theme.colors.red[9], 0.8),
                borderColor: theme.colors.red[9],
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
                display: false
            }
        },
    };

    return <Bar height={100}  data={chartData} options={options} />;
};

export default BarChart;
