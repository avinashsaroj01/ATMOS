import React from 'react';
import { Paper } from "@mantine/core";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    plugins: {
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};


const BarChart = ({ basicData, bgColorPalette }) => {

    const data = {
        labels: Object.keys(basicData),
        datasets: [
            {
                labels: 'Personal Tasks',
                data: Object.values(basicData),
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette,
                borderColor: 'rgb(65, 129, 217)',
            }
        ],

    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    }

    return (
        <>
            <Paper withBorder w={'40vw'} mt={'10px'}>
                <Bar options={options} data={data} style={{ minHeight: '350px', maxHeight: '350px' }} />
            </Paper>
        </>
    );
}

export default BarChart;