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

const CombineBarChart = ({ dataArray, bgColorPalette }) => {

    const data = {
        labels: ['High Priority', 'Medium Priority', 'Low Priority', 'Choose Priority'],
        datasets: [
            {
                label: 'Total Tasks',
                data: [
                    dataArray[0]['total'],
                    dataArray[1]['total'],
                    dataArray[2]['total'],
                    dataArray[3]['total'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[0],
                borderColor: 'rgb(65, 129, 217)',
            },
            {
                label: 'Completed Tasks',
                data: [
                    dataArray[0]['completed'],
                    dataArray[1]['completed'],
                    dataArray[2]['completed'],
                    dataArray[3]['completed'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[1],
                borderColor: 'rgb(65, 129, 217)',
            },
            {
                label: 'Pending Tasks',
                data: [
                    dataArray[0]['not-completed'],
                    dataArray[1]['not-completed'],
                    dataArray[2]['not-completed'],
                    dataArray[3]['not-completed'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[2],
                borderColor: 'rgb(65, 129, 217)',
            },
        ],
    };

    // console.log(data, 'data from CombineBarChart');


    return (
        <>
            <Paper withBorder w={'40vw'} mt={'10px'}>
                <Bar options={options} data={data} style={{ minHeight: '350px', maxHeight: '350px' }} />
            </Paper>
        </>
    );
}


export default CombineBarChart;